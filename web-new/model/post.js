const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  des: {
    type: String,
    required: true,
  },
  cmt: {
    type: [
      {
        content: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("post", postSchema);
