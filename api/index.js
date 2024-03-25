const express = require('express')
const mongoose = require('mongoose')
const dotnev = require('dotenv')
const userRoutes = require('../api/routes/userRoutes')
const cors = require('cors')
dotnev.config()
const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to database");
}).catch((error)=>{
    console.log(error);
})

app.use('/api/user' , userRoutes)
app.listen(3000 , ()=>{
    console.log("we are at port 3000");
})