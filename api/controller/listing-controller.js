const listingModel = require("../models/listing-model")

const  CreateListingController = async(req, res)=>{
    try {
        const list = await listingModel.create(req.body)
        return res.status(200).json(list)
    } catch (error) {
        res.status(500).send({
            sucess:false , 
            message:"error in creating the listing"
        })
    }
}
module.exports = {CreateListingController}