const express = require("express");
const app = express();

//app.use("/route",rh,[rh2,rh3],rh4,rh5)

app.get(
    "/user",
    (req,res,next)=>{
        console.log("handling the route user !!");
        next();
    },
    (req,res,next)=>{
        console.log("handling the route user 1 !!");
        //res.send("2nd response");
        next();
    },
    (req,res,next)=>{
        console.log("handling the route user 2 !!");
        //res.send("2nd response");
        next();
    },
    (req,res,next)=>{
        console.log("handling the route user 3 !!");
        //res.send("3nd response");
        next();
    },
    (req,res,next)=>{
        console.log("handling the route user 4 !!");
        res.send("4nd response");
        next();
    }
)
app.listen(7777,()=>{
    console.log("server is seccussfully listening on port 7777....");
});