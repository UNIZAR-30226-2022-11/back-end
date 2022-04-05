'use strict';
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "motinsa8",
    database: "ajedrez"
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

module.exports = con;