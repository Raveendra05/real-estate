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
module.exports = {CreateListingController}