const listingModel = require("../models/listing-model")

const  CreateListingController = async(req, res)=>{
    try {
        // console.log(req.body.formData);
        const list = await listingModel.create(req.body.formData)
        return res.status(200).json(list)
    } catch (error) {
        res.status(500).send({
            sucess:false , 
            error
        })
    }
}
const DeleteUserListing =async(req, res)=>{
    const list = await listingModel.findById(req.params.id);
    if(!list){
        return res.status(500).send({
            message:"list not found"
        })
    }
    if(req.user.id !== list.userRef){
        return res.status(500).send({
            message:"you can delete your own listing"
        })
    }
    try {
        await listingModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            sucess:true ,
             message :"list deleted sucessfully"
        })
    } catch (error) {
        return res.status(500).send({
            message:"error in deleting your listing"
        })
    }
}

const UpdateListingUserController = async(req, res)=>{
    // console.log(req.body);
    const list = await listingModel.findById(req.params.id)
    if(!list){
        return res.status(500).send({
            sucess:false , 
            message:"listing not found"
        })
    }
    if(req.user.id !== list.userRef){
        return res.status(500).send({
            sucess:false , 
            message:"you can update your own listing"
        })
    }
    try {
        const updatedlist = await listingModel.findByIdAndUpdate(req.params.id , req.body.formData , {
            new:true
        })
        res.status(200).send({
            sucess:true , 
            message:"updated sucessfully" , 
            updatedlist
        })
    } catch (error) {
        res.status(500).send({
            message:"error in updating the user listing"
        })
    }
}

const GetUserListing = async(req ,res)=>{
    try {
        const userData = await listingModel.findById(req.params.id)
        if(!userData){
            return res.status(500).send({
                sucess:false , 
                message:"listing is not found"
            })
        }
        // console.log(userData);
        res.status(200).send({
            sucess:true , 
            message:"user data is",
            userData
        })

    } catch (error) {
        res.status(500).send({
            sucess:false ,
            message:"error in getting the the data of user"
        })
    }
}
module.exports = {CreateListingController ,DeleteUserListing,UpdateListingUserController , GetUserListing}