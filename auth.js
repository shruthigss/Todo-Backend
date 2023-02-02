const jwt=require("jsonwebtoken")
const User=require("./models/user")

exports.isAuthenticated=async function(req,res,next){
    try {
        const {authorization}= req.headers
        if(!authorization ||authorization== "Bearer null"){
            return res.json({
                error:"Please login first"
            })
        }
        let token=authorization.replace("Bearer ","")
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=await User.findById(decoded._id)
        next()
    } catch (error) {
        res.json({
            error:error.message
        })   
    }
}
