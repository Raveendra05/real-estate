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
module.exports = {CreateListingController ,DeleteUserListing}