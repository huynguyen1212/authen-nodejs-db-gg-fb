const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
