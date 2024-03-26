const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String , 
        required:true,
        unique:true
    },
    email:{
        type:String , 
        required:true , 
        unique:true
    },
    password:{
        type:String , 
        required:true
    },
    avatar:{
        type:String , 
        default:"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
    }
} , {timestamps:true})

const User = mongoose.model('User' , userSchema)
module.exports = User