const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB Atlas Connected");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    throw err;
  }
}

module.exports = connectDB;