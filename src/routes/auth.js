const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation")
const User = require("../models/user");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");


authRouter.post("/signup", async (req, res) => {
  //creating a new instance of the user model
  // const user = new User({
  //     firstName:"akshay",
  //     lastName:"saini",
  //     emailId:"akshay@saini.com",
  //     password:"akshay@123",
  // });

  try{
    //validation of data
    validateSignUpData(req);

    const{ firstName,lastName,emailId,password} = req.body;

    //encrypt the password
    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash);
  
    //creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    });

  //dynamic data............
  // const user = new User(req.body);//bad way to create a new user

  await user.save();
  res.send("user added successfully");
  }catch(err){
    res.status(400).send("error:" + err.message)
  }
});   

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).send("Email and password required");
    }

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password); 

    if (isPasswordValid) {
      //create a JWT token
      const token = await user.getJwt();

      //add the token to cookie and send the response back to the user
      res.cookie("token",token,{
        expires:new Date(Date.now() + 8*3600000),
      });
      res.send("login successful!!!");
    }else{
      res.send("invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = authRouter;