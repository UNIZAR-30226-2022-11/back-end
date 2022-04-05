/////////////////////////////////////////////////////////////////////
// app initialization //
/////////////////////////////////////////////////////////////////////

const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
//const hbs = require("express-handlebars");
const app = express();
app.set('view engine', 'ejs');

const model = require('./models/chessdb.js');
