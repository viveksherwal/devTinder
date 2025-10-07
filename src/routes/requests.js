const express = require("express");
const requestRouter = express.Router();
const {userauth} = require("../middlewares/auth");


requestRouter.post("/sendConnectionRequest",userauth,async(req,res)=>{
  const user = req.user;
  //sending a connection request
  console.log("sending a conection request");
  res.send(user.firstName+ " sent the connection request");
});

module.exports = requestRouter;