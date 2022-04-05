const express = require('express')
const router = express.Router()
//const User = require('../models/user')
const passport = require('passport')
const myPassport = require('../configs/passport')
const con = require('../configs/database')

/*router.post('/', (req, res) => {
    res.send("Post: login")
})*/
// router.post('/', myPassport.checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/',
//     failureFlash: true})
// )

router.post('/', function(request, response) {
	// Capture the input fields
	let username = request.body.Nickname;
	let password = request.body.contraseña;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		con.query('SELECT * FROM usuario WHERE Nickname = ? AND contraseña = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
module.exports = router