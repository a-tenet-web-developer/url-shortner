const crypto = require("crypto");

/**
 * Generate a deterministic hash from the URL
 * @param {string} url
 * @returns {string} hash
 */
function generateHash(url) {
  return crypto.createHash("md5").update(url).digest("hex").substring(0, 8); // Shorten hash
}

/**
 * Decode hash (if needed, placeholder for extensibility)
 * @param {string} hash
 * @returns {string}
 */
function decodeHash(hash) {
  return hash; // Placeholder; deterministic encoding ensures reversibility
}

module.exports = { generateHash, decodeHash };
