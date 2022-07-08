const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    storage: {
      type: String,
      required: true,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  record: [recordSchema],
});

module.exports = mongoose.model("User", userSchema);
