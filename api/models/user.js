// Create a collection in monogodb to store user information(ID,Name,email,phone,password, profile image) and

const mongoose = require("mongoose");

const users = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },

  profile_image: {},

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", users);
