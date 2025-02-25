const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique:true
  },
  phone:{
    type:String,
    required:true
  },
  query: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    enum: ["New","Open", "In Progress", "Closed"],
    default: "New",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Query", userSchema);
