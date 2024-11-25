const express = require("express");
const { generateHash, decodeHash } = require("../utils/hash");

const router = express.Router();

// In-memory mapping for runtime storage
const urlMap = new Map();

const isValidUrl = (url) => {
  const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/;
  return urlRegex.test(url);
};

router.post("/", (req, res) => {
  const { originalUrl, customAlias } = req.body;

  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  if (customAlias && urlMap.has(customAlias)) {
    return res.status(400).json({ error: "Custom alias already exists" });
  }

  const hash = customAlias || generateHash(originalUrl);
  urlMap.set(hash, originalUrl);
  res.json({ shortUrl: `http://localhost:3000/shorten/${hash}` });
});

// Redirect to original URL
router.get("/:hash", (req, res) => {
  const { hash } = req.params;

  const originalUrl = urlMap.get(hash);

  if (!originalUrl) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.redirect(originalUrl);
});

module.exports = router;
