const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    // lowercase: true,
    // match: [/^\S+@\.\S+$/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

const signUp = mongoose.model("signUpPage", signUpSchema);

module.exports = signUp;
