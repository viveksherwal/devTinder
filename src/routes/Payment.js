const express = require("express");
const paymentRouter = express.Router();
const { userauth } = require("../middlewares/auth");
const razorpay = require("../utils/razorpay");
const Payment = require("../models/payment");
const { membershipAmount } = require("../utils/constants");
const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");
const user = require("../models/user");  

paymentRouter.post("/payment/create", userauth, async (req, res) => {
  try {
    const {membershipType} = req.body;
    const {firstName, lastName,emailId} = req.user;
    
    const order = await razorpay.orders.create({
      amount: membershipAmount[membershipType] * 100, // amount in paise
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: firstName, 
        lastName: lastName,
        emailId: emailId,
        membershipType: membershipType,
      },
    });


    //save it in my database 
    console.log(order)


    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status, 
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment =  await payment.save();

    //Return back my order details to frontend
    res.json({ ...savedPayment.toJSON() ,keyId: process.env.RAZORPAY_KEY_ID});
  } catch (err) {
    console.error("Payment creation error:", err);
    return res.status(500).json({"msg": err.message})
  }
}); 

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    console.log("webhook called");
    const webhookSignature = req.get("x-razorpay-signature");
    console.log("webhook singature:", webhookSignature);

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if(!isWebhookValid) {
      console.log("Invalid webhook signature");
      return res.status(400).send   ("Invalid webhook signature");
    } 
    console.log("webhook signature is valid");

    //update my payment status in Db
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();
    console.log("payment status updated in db");

    const userData = await user.findById({_id: payment.userId});
    userData.isPremium = true;
    userData.membershipType = paymentDetails.notes.membershipType;
    await userData.save();
    console.log("user membership updated in db");

    // if(req.body.event === "payment.captured") {
    // }
    // if(req.body.event === "payment.failed") {
    // }
    //return success responce to razorpay
    return res.status(200).json({"msg": "webhook received successfully"});
  }catch (err) {
    return res.status(500).json({"msg": err.message})
  }
});

paymentRouter.get("/payment/verify",userauth,async(req,res)=>{
  const user = req.user.toJSON();
  if(user.isPremium){
    return res.json({...user});
  }
  return res.json({...user});
});


 
module.exports = paymentRouter;
