const express = require('express')
const { TokenVerification } = require('../utils/utils')
const { CreateListingController ,DeleteUserListing ,UpdateListingUserController,GetUserListing} = require('../controller/listing-controller')
const router = express.Router()

router.post('/create-listing' , TokenVerification , CreateListingController)
router.delete('/delete-listing/:id' , TokenVerification , DeleteUserListing)
router.post('/update-listing/:id' , TokenVerification , UpdateListingUserController)
router.get('/get-listing/:id' , GetUserListing)
module .exports = router