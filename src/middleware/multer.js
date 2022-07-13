const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });

exports.singleUpload = (req, res, next) => {
  upload.single("audio");

  return res.json({ message: "successfully uploaded" });
};
