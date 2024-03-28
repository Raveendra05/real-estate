const express = require('express')
const { TokenVerification } = require('../utils/utils')
const { CreateListingController } = require('../controller/listing-controller')
const router = express.Router()

router.post('/create-listing' , TokenVerification , CreateListingController)

module .exports = router