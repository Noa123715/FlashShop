const express = require("express");
const router = express.Router();
const multer = require("multer");
const tipsController = require("../controllers/tipsController.js");

// --- Multer setup ---
const upload = multer(); // store file in memory as Buffer


router.get("/", tipsController.getAllTips);

module.exports = router;