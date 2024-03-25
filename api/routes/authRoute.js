const express = require('express')
const {SignUpController ,SignInController} = require('../controller/authController')
const router = express.Router()

router.post('/signup' , SignUpController)
router.post('/signin' , SignInController)

module.exports = router;