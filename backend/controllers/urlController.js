const Url = require("../models/Url");
const { nanoid } = require("nanoid");
const validator = require("validator");
const mongoose = require("mongoose");

const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    const url = await Url.findByIdAndDelete(id);

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    res.json({
      message: "URL deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;

if (!validator.isURL(url)) {
  return res.status(400).json({
    message: "Invalid URL",
  });
}

    const shortCode = nanoid(5);

    const newUrl = await Url.create({
      originalUrl: url,
      shortCode,
    });

    res.status(201).json({
  shortCode: newUrl.shortCode,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    res.json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      clicks: url.clicks,
      createdAt: url.createdAt,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({
      createdAt: -1,
    });

    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = {
  createShortUrl,
  redirectUrl,
  getAnalytics,
  getAllUrls,
  deleteUrl,
};

