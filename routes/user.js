const express=require("express")
const User=require("../models/user");
const Activity=require("../models/activity")

const router=express.Router()
const jwt=require("jsonwebtoken")
const { isAuthenticated } = require("../auth")
router.post("/signup",async(req,res)=>{
    try {
        let {email,password,confirmpassword}=req.body
        let user=await User.findOne({email})
        if(user){
            return res.json({
                error:"User Already Exists"
            })
        }  
        if(password!==confirmpassword){
            return res.json({
                error:"Password and confirm password does not match"
            })
        }
        user= await User.create({email,password})
        res.json(user)

    } catch (error) {
        res.json(error.message)
    }
})

router.post("/signin",async (req,res)=>{
    try {
        let {email,password}=req.body
        let user=await User.findOne({email})
        if(!user){
            return res.json({
                error:"User does not exists"
            })
        }
        if(password!=user.password){
            return res.json({
                error:"Password does not match"
            })
        }
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
        res.json({user,token})
    } catch (error) {
        res.json({error:error.message})
    }
   
})

router.post("/AddActivity",isAuthenticated,async(req,res)=>{
    try {
        const new_task_data = {
           Activity: req.body.Activity,
           Status: req.body.Status,
           TimeTaken:req.body.TimeTaken,
           Action:req.body.Action,  
        }
        const new_task =await Activity.create(new_task_data)
        const user= await User.findById(req.user._id)
        user.tasks.push(new_task._id)
        await user.save()
        res.status(201).json({
            status :"Task created",
            task : new_task
        })

    } catch (error) {
        res.json({error:error.message})
    }
})

router.put("/editActivity",isAuthenticated,async(req,res)=>{
    try {
        let updateTask= await Activity.updateOne({_id:req.body.task._id},{$set:{TimeTaken:req.body.TimeTaken}})
        let task=await Activity.findById(req.body.task._id)
       console.log(task.TimeTaken)
       res.json({task})
    } catch (error) {
        res.json({error:error.message})
    }
})

router.get("/myActivities",isAuthenticated,async(req,res)=>{
    let TaskIds=await User.findById(req.user._id)
    let ids=TaskIds.tasks
    // console.log(data.posts[0],typeof(data.posts[0]))
    var obj_ids = ids.map(function(id) { return String(id); });
    let data=await Activity.find({"_id":{$in : obj_ids}})
    // console.log(data)
    res.send(data)
})
module.exports=router