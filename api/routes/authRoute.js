const express = require('express')
const {SignUpController} = require('../controller/authController')
const router = express.Router()

router.post('/signup' , SignUpController)
module.exports = router;