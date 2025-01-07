const mongoose = require("mongoose");
const { DB_NAME } = require("../constants/constants.js");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connected to ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB Connection Error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
