const express = require('express')
const {SignUpController ,SignInController, GoogleController, SignOutController} = require('../controller/authController')
const router = express.Router()

router.post('/signup' , SignUpController)
router.post('/signin' , SignInController)
router.post('/google' , GoogleController)
router.get('/signout' , SignOutController)
module.exports = router;