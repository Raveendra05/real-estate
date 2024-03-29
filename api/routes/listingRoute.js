const express = require('express')
const { TokenVerification } = require('../utils/utils')
const { CreateListingController ,DeleteUserListing } = require('../controller/listing-controller')
const router = express.Router()

router.post('/create-listing' , TokenVerification , CreateListingController)
router.delete('/delete-listing/:id' , TokenVerification , DeleteUserListing)

module .exports = router