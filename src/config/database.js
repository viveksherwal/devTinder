// const mongoose = require("mongoose");

// const connectDB = async()=>{
//     await mongoose.connect("mongodb+srv://viveksherwal:Kumar1234$@viveksherwal.wqrkn7e.mongodb.net/devTinder");
// };

// module.exports = connectDB;

// config/database.js
// config/database.js
const mongoose = require("mongoose");

async function connectDB() {
  try {
      await mongoose.connect(
        process.env.DB_CONNECTION_SECRET, // No extra TLS options needed
      );
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

module.exports = connectDB;
