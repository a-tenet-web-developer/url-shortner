const express = require("express");
const { generateHash, decodeHash } = require("../utils/hash");

const router = express.Router();

// In-memory mapping for runtime storage
const urlMap = new Map();

// Shorten a URL
router.post("/", (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  const hash = generateHash(originalUrl);

  // Save mapping temporarily in memory
  urlMap.set(hash, originalUrl);

  const shortUrl = `http://localhost:3000/shorten/${hash}`;
  res.json({ shortUrl });
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
