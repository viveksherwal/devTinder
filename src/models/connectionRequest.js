const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        status:{
            type:String,
            required:true,
            enum:{
                values:["ignored","interested","accepted","rejected"],
                message:`{VALUE} is incorrect status type`,
            },
        },
    },
    {timestamps:true}
);

connectionRequestSchema.pre("save", async function (next) {
    const connectionRequest = this;
    //check if the fromUserI d and toUserId are the same
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("fromUserId and toUserId cannot be the same");
    }
    next();
});


const connectionRequestModel = mongoose.model(
    "connectionrequest",
    connectionRequestSchema
);

module.exports = connectionRequestModel; 