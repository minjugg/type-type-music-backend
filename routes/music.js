const express = require("express");
const router = express.Router();
const musicRecordController = require("./controller/musicRecord.controller");

const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });

router.get("/users/:username/records", musicRecordController.allMusicRecords);

router.post(
  "/users/:username/records",
  upload.single("audio"),
  musicRecordController.newMusicRecord
);

router.patch(
  "/users/:username/records/:recordId",
  musicRecordController.pressLikes
);

module.exports = router;
