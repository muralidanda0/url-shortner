const express = require("express");

const router = express.Router();
const {
  createShortUrl,
  redirectUrl,
  getAnalytics,
  getAllUrls,
    deleteUrl,
} = require("../controllers/urlController");

router.post("/shorten", createShortUrl);
router.get("/analytics/:shortCode", getAnalytics);
router.get("/", getAllUrls);
router.delete("/:id", deleteUrl);
router.get("/:shortCode", redirectUrl);

module.exports = router;