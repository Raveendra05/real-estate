const  userModel  = require('../../api/models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { hashPassword, comparePass } = require('../../api/utils/utils')
const SignUpController = async(req ,res)=>{
    const {username , password , email} = req.body.formData;
    try {
        if(!username){
            return res.status(500).send({
                message:"username is required"
            })
        }
        if(!password){
            return res.status(500).send({
                message:"password is required"
            })
        }
        if(!email){
            return res.status(500).send({
                message:"email is required"
            })
        }
        const match_user = await userModel.findOne({username})
        if(match_user){
            return res.status(500).send({
                message:"username is already exist"
            })
        }
        const match = await userModel.findOne({email})
        if(match){
            return res.status(500).send({
                message:"email is already exist"
            })
        }
        const hashedPassword = await hashPassword(password)
        const newUser = await new userModel({
            username , password:hashedPassword , email
        }).save()
        res.status(200).send({
            sucess:true , 
            message:"user created sucessfully" , 
            newUser
        })
    } catch (error) {
        console.log(error)
    }
}

const SignInController =async(req,res)=>{
    try {
    const {email , password} = req.body
    // console.log(email);
        if(!email){
            return res.status(500).send({
                message:"email is required"
            })
        }
        if(!password){
            return res.status(500).send({
                message:"password is required"
            })
        }
        const Vaild_User = await userModel.findOne({email})
        if(!Vaild_User){
            return res.status(500).send({
                sucess:false , 
                message:"User not Exist or Vaild User"
            })
        }
        const Vaild_Password = await comparePass(password , Vaild_User.password)
        if(!Vaild_Password){
            return res.status(500).send({
                sucess:false,
                message:"password is incorrect"
            })
        }
        const token = await jwt.sign({id:Vaild_User._id} , process.env.SECRET_KEY)
        const {password:pass , ...rest} = Vaild_User._doc
        // res.status(200).send({
        //     sucess:true,
        //     message:"login sucessfully",
            
        // })
        res.cookie('access_token' , token , {httpOnly : true})
        .status(200)
        .json(rest)
    } catch (error) {
        console.log(error);
    }
}

const GoogleController = async(req, res)=>{
    try {
        const user = await userModel.findOne({
            email:req.body.email
        })
        if(user){
            const token =  jwt.sign({id:user._id } , process.env.SECRET_KEY)
            const {password:pass , ...rest} = user._doc;
            res.cookie('access_token' , token , {httpOnly:true})
            .status(200)
            .json(rest);
        }
        else{
            const generatePassword = Math.random().toString(36).slice(-8)
            const hashdPassword = await hashPassword(generatePassword)
            const newUser =await  new userModel({
                username:req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4)   , 
                email:req.body.email , 
                password:hashdPassword,
                avatar : req.body.photo
            })
            await newUser.save()
            const token = jwt.sign({id:newUser._id}  , process.env.SECRET_KEY)
            const {password : pass , ...rest} = newUser._doc;
            res.cookie('access_token' , token , {httpOnly:true})
            .status(200)
            .json(rest)
        }
    } catch (error) {
        console.log(error);
    }
}

const SignOutController = async(req, res)=>{
    try {
        res.clearCookie('access_token')
        res.status(200).json('User is logged our Sucessfully')
    } catch (error) {
        res.status(500).send({
            sucess:false , 
            message:"error in Logged out the user"
        })
    }
}
module.exports = {SignUpController ,SignInController,GoogleController ,SignOutController}