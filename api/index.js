const express = require('express')
const mongoose = require('mongoose')
const dotnev = require('dotenv')
const userRoutes = require('../api/routes/userRoutes')
const AuthRoutes = require('../api/routes/authRoute')
const listingRoutess = require('../api/routes/listingRoute')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
dotnev.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to database");
}).catch((error)=>{
    console.log(error);
})


const app = express()

const dirname = path.resolve()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api/user' , userRoutes)
app.use('/api/auth' , AuthRoutes)
app.use('/api/listing' ,listingRoutess )

app.use(express.static(path.join(dirname ,'/client/dist')))

app.get('*' , (req, res)=>{
    res.sendFile(path.join(dirname , 'client' ,'dist' , 'index.html'))
})
app.listen(3000 , ()=>{
    console.log("we are at port 3000");
})