const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userauth= async (req,res,next)=>{
try{
  const cookies = req.cookies;
  const {token} = cookies;
  if(!token){
    return res.status(401).send("please login first");
  }
  const decodeMessage = await jwt.verify(token,"bhes@123")
  const{_id} = decodeMessage;

  const user = await User.findById(_id);
  if(!user){
    throw new Error("user does not exist");
  }

  req.user = user;
  next();
  }catch(err){
    res.status(400).send("error : " + err.message);
  }
};



module.exports  = {
    userauth,
}