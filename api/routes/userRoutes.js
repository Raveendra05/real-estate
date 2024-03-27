const express = require('express')
const {test, UpdateUserController} = require('../controller/userController')
const { TokenVerification } = require('../utils/utils')
const router = express.Router()

router.get('/test' ,test)
router.post('/updateUser/:id', TokenVerification ,UpdateUserController )
module.exports = router