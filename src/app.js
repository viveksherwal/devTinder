const express = require("express");
const app = express();
const connectDB = require("./config/database"); 
const User = require("./models/user");

app.post("/signup",async(req,res)=>{
    //creating a new instance of the user model
    const user = new User({
        firstName:"akshay",
        lastName:"saini",
        emailId:"akshay@saini.com",
        password:"akshay@123",
    });

    await user.save();
    res.send("user added successfully");
});

connectDB().then(()=>{
    console.log("database connection established....");
})
.catch((err)=>{
    console.log("database cannot be connected"); 
})

app.listen(7777,()=>{
    console.log("server is eccussfully listening on port 7777....");
});