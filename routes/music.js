const express = require("express");
const router = express.Router();
const MusicController = require("../Controller/music.controller");

const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });

router.get("/", MusicController.getAllMusic);

router.post("/", upload.single("audio"), MusicController.createMusic);

router.patch("/:recordId", MusicController.toggleLikeById);

router.delete("/:recordId", MusicController.deleteMusicById);

module.exports = router;
