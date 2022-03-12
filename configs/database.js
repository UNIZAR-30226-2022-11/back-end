'use strict';
const mysql = require('mysql');
require("dotenv").config();

const db = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: 'ajedrez',
    port: 3306
});

module.exports = db;