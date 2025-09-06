const express = require("express");
const app = express();


app.use("/hello",(req,res)=>{
    res.send("hello hello");
});
app.use("/",(req,res)=>{
    res.send("namastey bhes");
});

app.use("/test",(req,res)=>{
    res.send("hello from server ");
});

app.listen(7777,()=>{
    console.log("server is seccussfully listening on port 7777....");
});