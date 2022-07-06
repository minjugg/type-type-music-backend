const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");

const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });

router.get("/login", function (req, res, next) {
  return res.json({ message: "login successfully done" });
});

router.post("/upload", upload.single("audio"), async (req, res, next) => {
  const filename = "filename";
  const bucketname = "typetypemusicbucket";
  const file = req.body.data;

  await uploadAudio(filename, bucketname, file);
  res.json({ file: file });
});

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const uploadAudio = (filename, bucketname, file) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: filename,
      Bucket: bucketname,
      Body: file,
      ContentType: "audio/mpeg",
      ACL: "public-read",
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = router;
