const express=require("express")
const mongodb=require("mongodb")
const mongoose= require("mongoose")
const app=express()
const dotenv = require("dotenv").config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology: true,useNewUrlParser: true}).then(()=>{
    console.log("connected to database")
})

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config({path:"config.env"})
}

const user=require("./routes/user")
app.use(express.json())
app.use(user)

if (process.env.NODE_ENV === 'production') {
    //*Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

app.use(express.json())

app.listen(process.env.PORT,()=>{
    console.log("server is running at 5000")
})