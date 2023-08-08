const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to DB....");
  } catch (err) {
    return console.log(err);
  }
};
module.exports = connectDB;
