const express = require('express')
const {SignUpController ,SignInController, GoogleController} = require('../controller/authController')
const router = express.Router()

router.post('/signup' , SignUpController)
router.post('/signin' , SignInController)
router.post('/google' , GoogleController)
module.exports = router;