const User = require("../../src/model/User");
const { uploadAudioToAWS } = require("../../src/utils/uploadAudio");

exports.allMusicRecords = async (req, res, next) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user) {
    return res.send({ message: "No music made yet." });
  }

  const records = user.record;

  return res.send(records);
};

exports.newMusicRecord = async (req, res, next) => {
  const { username } = req.params;

  const filename = username + Date.now();
  const bucketname = process.env.BUCKET_NAME;
  const file = req.file.buffer;
  const tag = req.body.tag;

  const audioData = await uploadAudioToAWS(filename, bucketname, file);
  const storageUrl = audioData.Location;

  const existingUser = await User.find({ username });

  if (!existingUser.length) {
    await User.create({
      username,
      record: { storageUrl, tag },
    });
  } else {
    await User.findOneAndUpdate(
      { username },
      {
        $push: {
          record: { storageUrl, tag },
        },
      }
    );
  }

  res.send("uploaded successfully");
};

exports.toggleLikes = async (req, res, next) => {
  const { username, recordId } = req.params;

  const user = await User.updateOne(
    { username },
    {
      $set: {
        "record.$[pressed].isLiked": !req.body.isLiked,
      },
    },
    {
      arrayFilters: [
        {
          "pressed._id": {
            $eq: recordId,
          },
        },
      ],
    }
  );

  return res.send(user);
};

exports.existingMusicRecord = async (req, res, next) => {
  const { username, recordId } = req.params;

  const user = await User.updateOne(
    { username },
    {
      $pull: {
        record: {
          _id: { $eq: recordId },
        },
      },
    }
  );

  return res.send(user);
};
