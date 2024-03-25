const  userModel  = require('../../api/models/userModel');
const bcrypt = require('bcrypt');
const { hashPassword } = require('../../api/utils/utils')
const SignUpController = async(req ,res)=>{
    const {username , password , email} = req.body;
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
module.exports = {SignUpController}