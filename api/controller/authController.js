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
    const {email , password} = req.body.formData;
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
module.exports = {SignUpController ,SignInController}