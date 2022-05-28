const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  userName: String,
  email: String,
  mobileNumber: String,
  password: String,
  gender: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
