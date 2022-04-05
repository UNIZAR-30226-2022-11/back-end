const express = require('express')
const router = express.Router()
//const User = require('../models/user')
const bcrypt = require('bcrypt')
const User = require("../models/controller");
const myPassport = require('../configs/passport');
const { Router } = require('express');

/*router.get('/', (req, res) => {
    res.send("Get: Register")
})*/


router.post("/", User.create);
module.exports = router