const express = require('express')
const mongoose = require('mongoose')
const dotnev = require('dotenv')
const userRoutes = require('../api/routes/userRoutes')
const AuthRoutes = require('../api/routes/authRoute')
const listingRoutess = require('../api/routes/listingRoute')
const cors = require('cors')
const cookieParser = require('cookie-parser')
dotnev.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to database");
}).catch((error)=>{
    console.log(error);
})

app.use('/api/user' , userRoutes)
app.use('/api/auth' , AuthRoutes)
app.use('/api/listing' ,listingRoutess )

app.listen(3000 , ()=>{
    console.log("we are at port 3000");
})