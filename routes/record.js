const express = require("express");
const router = express.Router();
const RecordController = require("../controller/record.controller");

const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });

router.get("/", RecordController.getAllRecords);

router.post("/", upload.single("audio"), RecordController.createRecord);

router.patch("/:recordId", RecordController.toggleLikeById);

router.delete("/:recordId", RecordController.deleteRecordById);

module.exports = router;
