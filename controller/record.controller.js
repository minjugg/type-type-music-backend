const User = require("../src/model/User");
const { uploadAudioToAWS } = require("../src/utils/uploadAudio");

exports.getAllRecords = async (req, res, next) => {
  try {
    const { userId } = req;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.json({ message: "No music made yet." });
    }

    const records = user.record;

    return res.json(records);
  } catch (error) {
    next(error);
  }
};

exports.createRecord = async (req, res, next) => {
  try {
    const { userId } = req;

    const filename = userId + Date.now();
    const bucketname = process.env.BUCKET_NAME;
    const file = req.file.buffer;
    const { tag } = req.body;

    const audioData = await uploadAudioToAWS(filename, bucketname, file);
    const storageUrl = audioData.Location;

    const existingUser = await User.find({ userId });

    if (!existingUser.length) {
      await User.create({
        userId,
        record: { storageUrl, tag },
      });
    } else {
      await User.findOneAndUpdate(
        { userId },
        {
          $push: {
            record: { storageUrl, tag },
          },
        }
      );
    }

    return res.json({ message: "Successfully uploaded." });
  } catch (error) {
    next(error);
  }
};

exports.toggleLikeById = async (req, res, next) => {
  try {
    const { userId } = req;
    const { recordId } = req.params;

    const user = await User.updateOne(
      { userId },
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

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteRecordById = async (req, res, next) => {
  try {
    const { userId } = req;
    const { recordId } = req.params;

    const user = await User.updateOne(
      { userId },
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
