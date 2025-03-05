const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  senderEmail: String,
  adminName: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone:{
    type:String,
    // required:true
  },
  query: {
    type: String,
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
    enum: ["New", "Open", "Progress", "Closed"],
    default: "New",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  replies: [replySchema], // Storing all replies here
  messageId: String, // Stores the first email's message ID
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Query", userSchema);
