const express = require('express')
const {test, UpdateUserController, DeleteUserController , getUserAllListings ,getUserController} = require('../controller/userController')
const { TokenVerification } = require('../utils/utils')
const router = express.Router()

router.get('/test' ,test)
router.post('/updateUser/:id', TokenVerification ,UpdateUserController )
router.delete('/deleteUser/:id' , TokenVerification , DeleteUserController)
router.get('/listings/:id' , TokenVerification , getUserAllListings)
router.get('/:id' , TokenVerification , getUserController)
module.exports = router