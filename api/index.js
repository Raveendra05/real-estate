const express = require('express')
const mongoose = require('mongoose')
const dotnev = require('dotenv')
dotnev.config()
const app = express()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to database");
}).catch((error)=>{
    console.log(error);
})
app.listen(300 , ()=>{
    console.log("we are at port 3000");
})