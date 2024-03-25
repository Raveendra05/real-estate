const express = require('express')
const test = require('../controller/userController')
const router = express.Router()

router.get('/test' ,test)
module.exports = router