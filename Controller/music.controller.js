const User = require("../src/model/User");
const { uploadAudioToAWS } = require("../src/utils/uploadAudio");

exports.getAllMusic = async (req, res, next) => {
  try {
    const { username } = req;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: "No music made yet." });
    }

    const records = user.record;

    return res.json(records);
  } catch (error) {
    next(error);
  }
};

exports.createMusic = async (req, res, next) => {
  try {
    const { username } = req;

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

    return res.json({ message: "성공적으로 업로드되었습니다." });
  } catch (error) {
    next(error);
  }
};

exports.toggleLikeById = async (req, res, next) => {
  try {
    const { username } = req;
    const { recordId } = req.params;

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

    return res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteMusicById = async (req, res, next) => {
  try {
    const { username } = req;
    const { recordId } = req.params;

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

    return res.json(user);
  } catch (error) {
    next(error);
  }
};
