const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json()); //a middleware that  read the dnamic data and convert it to json readible data and then attach it to the req.body so we can read it;

app.post("/signup", async (req, res) => {
  //creating a new instance of the user model
  // const user = new User({
  //     firstName:"akshay",
  //     lastName:"saini",
  //     emailId:"akshay@saini.com",
  //     password:"akshay@123",
  // });

  //dynamic data............
  const user = new User(req.body);

  await user.save();
  res.send("user added successfully");
});
// ***********************************************************************
//get user by email
app.get("/user", async (req, res) => {
  console.log("body:", req.body);    // <-- log the whole body
  // const userEmail = req.body.emailId;
    const userEmail = req.body.emailId;

  console.log("userEmail:", userEmail);
  try {
    const users = await User.find({ emailId: userEmail }); //users bcz it send the array of user data
    if (users.length == 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
//************************************************** */
//feed api : get/feed -get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
// **********************************************************************************
app.delete("/user",async(req,res)=>{
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  }catch(err){
    res.status(400).send("something went wrong");
  }
});

app.patch("/user",async(req,res)=>{
  const userId = req.body.userId;
  const data = req.body;
  try{
    const ALLOWED_UPDATES = ["photourl","about","gender","age","skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
  );
  if(!isUpdateAllowed){
    throw new Error("updates not allowed");
  }
  if(data?.skills.length>10){
    throw new Error("skills cannot be more than 10"); 
  } 
    const user = await User.findByIdAndUpdate({ _id:userId},data,{returnDocument:"after",runValidators:true});
    console.log(user);
    res.send("user updated successfully");
  }catch(err){
    res.status(400).send("something went  wrong");
  }
});

connectDB()
  .then(() => {
    console.log("database connection established....");
  })
  .catch((err) => {
    console.log("database cannot be connected");
  });

app.listen(7777, () => {
  console.log("server is eccussfully listening on port 7777....");
});
