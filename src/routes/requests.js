const express = require("express");
const requestRouter = express.Router();
const {userauth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userauth,async(req,res)=>{
try{
  const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;

  const allowedStatus= ["ignored", "interested"];
  if (!allowedStatus.includes(status)) {
    return res.status(400).send("ERROR: Invalid status type " + status);
  }

  const toUser = await User.findById(toUserId);
  if (!toUser) {
    return res.status(404).send("ERROR: Target user not found.");
  }


  const existingConnectionRequest = await ConnectionRequest.findOne({
    $or: [
      { fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
  });

  if (existingConnectionRequest) {
    return res.status(400).send("ERROR: Connection request already exists between these users.");
  }
  
  const connectionRequest = new ConnectionRequest({
    fromUserId,
    toUserId,
    status,
  });

  const data = await connectionRequest.save();

  res.json({
    message:"connection request sent successfully",
    data,
  });
}catch(err){
  res.status(401).send("ERROR : " + err.message);
}
});

module.exports = requestRouter;