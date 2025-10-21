const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        trim:true,
          validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address:" + value);
            }
        }
    },
    password:{
        type:String,
        required:true,
            validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("pasword is not strong" + value);
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","other"],
            message:'{VALUE} is not a valid gender type',
        },
    },
    photoUrl : {
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQacFRPFNfehcosJ2_BGUCI5Nb6_iF4e4gDKOB6lf_MSyzza7HJ_ctdr4A-oalp2swXazU&usqp=CAU",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid photo url:" + value);
            }
        }
    },
    about:{
        type:String,
        default:"this is a default about of the user!"
    },
    skills:{
        type:[String],
    }

},{
    timestamps:true,
});

userSchema.methods.getJwt = async function(){
    const user = this;

    const token = await jwt.sign({_id:user._id},"bhes@123",{
        expiresIn:"7d",
    });
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash=user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash)
    return isPasswordValid;
}
module.exports = mongoose.model("user",userSchema);