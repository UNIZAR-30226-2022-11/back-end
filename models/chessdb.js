'use strict';
var con = require('../configs/database.js')
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });