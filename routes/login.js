const express = require('express')
const router = express.Router()
//const User = require('../models/user')

router.post('/', (req, res) => {
    console.log("post: login")
})

module.exports = router