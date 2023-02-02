const mongoose=require("mongoose")
const Schema=mongoose.Schema

const UserSchema = new Schema({
    email:{
        type:String,
        unique:true
    },
    password:String,
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]
})

const UserModel= mongoose.model("Users",UserSchema)
module.exports=UserModel
