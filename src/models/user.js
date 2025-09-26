const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required: true,
        lowercase:true,
        unique:true,
        trin:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data is not valid");
            }
        },
    },
    photoUrl : {
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQacFRPFNfehcosJ2_BGUCI5Nb6_iF4e4gDKOB6lf_MSyzza7HJ_ctdr4A-oalp2swXazU&usqp=CAU"
    },
    about:{
        type:String,
        default:"this is a default about of the user!"
    },
    skills:{
        type:[String],
    }

},{
    timeseries:true,
});

module.exports = mongoose.model("user",userSchema);