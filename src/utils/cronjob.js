const cron = require("node-cron");
const {subDays, startOfDay, endOfDay} = require("date-fns"); 
const connectionRequestModel = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");

cron.schedule("1 1 * * *", async () => {
    try{
        const yesterday = subDays(new Date(),1);
        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);

        const pendingRequests = await connectionRequestModel.find({
            status:"interested",
            createdAt: {
                $gte: yesterdayStart,
                $lte: yesterdayEnd
            },
        }).populate("fromUserId toUserId");

        const listOfEmails = [...new Set(pendingRequests.map((req) => req.toUserId.emailId))];

        console.log(listOfEmails);

        for(const email of listOfEmails){
            try{
            const res = await sendEmail.run(
                "new friend Request pening for " + email,
                "there are so many friend reqeuests pending,please login to devtindet to check them "
            );
            console.log("Cron job email sent status to " + email + " :" , res);
        }
        catch(err){
            console.error("Error sending cron job email to " + email + " :" , err);
        }   
        }
    } 
    catch(err){
        console.error("Error in cron job:", err);
    }       
});

module.exports = cron; 
