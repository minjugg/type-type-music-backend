const express = require("express");
const router = express.Router();
const recordController = require("./controller/musicRecord.controller");
const { singleUpload } = require("../src/utils/uploadAudio");

router.get("/users/:username/records", recordController.allMusicRecords);

router.post(
  "/users/:username/records",
  singleUpload,
  recordController.newMusicRecord
);

router.patch("/users/:username/records/:recordId", recordController.pressLikes);

module.exports = router;
