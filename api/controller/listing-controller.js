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

const getAllListings = async(req ,res)=>{
    try {
        let limit = parseInt(req.query.limit) || 9 ;
        let startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer

        if(offer === undefined ||  offer === "false"){
            offer = {$in :[false , true]}
        }
        let furnished = req.query.furnished;
        if(furnished === undefined || furnished === 'false'){
            furnished = {$in : [false , true]}
        }
        let parking = req.query.parking;
        if(parking === undefined || parking === 'false'){
            parking = {$in:[false , true]}
        }
        let type = req.query.type;
        if(type === undefined || type === 'all'){
            type = {$in:['rent' , 'sale']}
        }
        let searchTerm = req.query.serchTerm || '';
        let sort = req.query.sort || 'createdAt';
        let order = req.query.order || 'desc'

        const listings = await listingModel.find({
            name:{$regex:searchTerm , $options: 'i'},
            offer ,
            furnished ,
            parking ,
            type , 
        }).sort(
            {[sort] : order}
        ).limit(limit).skip(startIndex)

        return res.status(200).json(listings)
    } catch (error) {
        res.status(500).send({
            sucess:false , 
            message:"error in getting the listings"
        })
    }
}
module.exports = {CreateListingController ,DeleteUserListing,UpdateListingUserController , GetUserListing ,getAllListings}