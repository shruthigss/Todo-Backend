const mongoose=require("mongoose")
const Schema=mongoose.Schema

const ActivitySchema = new Schema({
    Activity:String,
    Status:String,
    TimeTaken:String,
    Action:String    
})

const ActivityModel= mongoose.model("Activities",ActivitySchema)
module.exports=ActivityModel