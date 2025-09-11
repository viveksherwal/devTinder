const express = require("express");
const app = express();

const {adminauth,userauth} = require("./middlewares/auth");

app.use("/admin",adminauth);

app.post("/user/login",(req,res)=>{
    res.send("user logged in successfully");
});

app.get("/user",userauth,(req,res)=>{
    res.send("user data sent");
});

app.get("/admin/getAllData",(req,res)=>{
    res.send("all data sent");
})

app.get("/admin/ ",(req,res)=>{
    res.send("delete all data sent");
})

app.listen(7777,()=>{
    console.log("server is seccussfully listening on port 7777....");
});