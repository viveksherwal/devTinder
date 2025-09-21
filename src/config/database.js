const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://viveksherwal:Kumar1234$@viveksherwal.wqrkn7e.mongodb.net/devTinder");
};

module.exports = connectDB;

