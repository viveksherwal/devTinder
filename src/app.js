const express = require("express");
const app = express();

// app.use("/user",(req,res)=>{
//     res.send("hhahahaahhhah");
// });

//this will only handle get call to /user
app.get("/user",(req,res)=>{
    res.send({firstName : "bhes",lastname : "ki tang"});
});

app.post("/user",(req,res)=>{
    //saving data to db
    res.send("data is succesfully saved to the database");
});

app.delete("/user",(req,res)=>{
    res.send("delete bhes");
});

//thsi will match all the http method api calls to /test
app.use("/test",(req,res)=>{
    res.send("hello from server ");
});

app.listen(7777,()=>{
    console.log("server is seccussfully listening on port 7777....");
});