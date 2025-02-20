const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect("mongodb+srv://ayush:ayush123@cluster0.xbde8.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error(err);
            });
}

module.exports = connectDB;