// const bcrypt = require('bcrypt')
const  userModel  = require('../../api/models/userModel');
const {hashPassword} = require('../utils/utils')
const test = (req , res)=>{
    res.send({
        message:"api is working"
    })
}
const UpdateUserController  =async(req, res)=>{
    try {
        if(req.user.id !== req.params.id){
            return res.status(500).send({
                sucess:false , 
                message:"you cannot update another account"
            })
        }
        if(req.body.password) {
            req.body.password =await hashPassword(req.body.password)
        }
        const updateUser = await userModel.findByIdAndUpdate(req.params.id , {
            $set:{
                username:req.body.username , 
                email:req.body.email , 
                password :req.body.password , 
                avatar:req.body.avatar
            }
        } , {new:true})
        // console.log(updateUser);
        const {password:pass , ...rest} = updateUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        console.log(error);
    }
}
module.exports = {test , UpdateUserController};