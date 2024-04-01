// const bcrypt = require('bcrypt')
const userModel = require("../../api/models/userModel");
const listingModel = require('../models/listing-model')
const { hashPassword } = require("../utils/utils");
const test = (req, res) => {
  res.send({
    message: "api is working",
  });
};
const UpdateUserController = async (req, res) => {
  try {
    // console.log(req.user);
    // console.log(req.body);
    if (req.user.id !== req.params.id) {
      return res.status(500).send({
        sucess: false,
        message: "you cannot update another account",
      });
    }
    if (req.body.formData.password) {
      req.body.formData.password = await hashPassword(req.body.formData.password);
      // console.log(req.body.formData.password);
    }
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.formData.username,
          email: req.body.formData.email,
          password: req.body.formData.password,
          avatar: req.body.formData.avatar,
        },
      },
      { new: true }
    );
    // console.log(updateUser);
    const { password: pass, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
  }
};

const DeleteUserController = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(500).send({
        sucess: false,
        message: "you can delete your own account",
      });
    }
    await userModel.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User is deleted sucessfully");
  } catch (error) {
    console.log(error);
  }
};

const getUserAllListings = async(req, res)=>{
  if(req.user.id === req.params.id){
    try {
      const listings = await listingModel.find({ userRef:req.params.id })
      // console.log(listings);
      res.status(200).send({
        sucess:true , 
        listings
      })
    } catch (error) {
      console.log(error);
    }
  }
  else{
    return  res.status(500).send({
      sucess:"false" , 
      message:"you can only view our own listing"
    })
  }

}
module.exports = { test, UpdateUserController, DeleteUserController,getUserAllListings };
