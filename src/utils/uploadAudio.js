const AWS = require("aws-sdk");

const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

exports.uploadAudioToAWS = (filename, bucketname, file) => {
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

exports.singleUpload = () => {
  upload.single("audio");
};
