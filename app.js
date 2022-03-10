/////////////////////////////////////////////////////////////////////
// app initialization //
/////////////////////////////////////////////////////////////////////

const express = require("express");
const session = require("express-session");
//const bcrypt = require("bcrypt");
//const hbs = require("express-handlebars");
const app = express();


const model = require('./models/chessdb.js');
