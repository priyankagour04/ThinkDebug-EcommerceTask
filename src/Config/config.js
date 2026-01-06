const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;


// Email settings
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_SECURE = process.env.EMAIL_SECURE;

module.exports = {
  connectDB,
  PORT: process.env.APP_PORT || 5065,
  APP_HOST: process.env.APP_HOST || "localhost",
  USER_DB_URI: process.env.USER_DB_URI,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_HOST,
  EMAIL_SERVICE,
  EMAIL_PORT,
  EMAIL_SECURE,
};
