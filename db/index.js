const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  const DB_NAME = "kiotel_hkcontroller";
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
