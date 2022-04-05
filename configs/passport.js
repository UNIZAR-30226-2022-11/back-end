const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

//const User = require("../models/user.js");
const User = require("../models/controller.js");

function initialize(passport) {
  const authenticateUser = async (nickname, password, done) => {
    var user
    try{
      if(await User.findOne(nickname, null, user)){}
    } catch(e) {
      console.log("Catch")
    }
    
    console.log(user)
    console.log("hoa")
    if (user == null) {
      //console.log(user)
      return done(null, false, { message: 'No user with that nickname' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log("Error cons")
        return done(null, user)
      } else {
        //console.log("Error cons")
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

 const strategy = new LocalStrategy({ usernameField: 'Nickname' ,passwordField: 'Contraseña'}, authenticateUser)
  //passport.use(strategy)
  
  

  passport.serializeUser((user, done) => done(null, user.Nickname))
  passport.deserializeUser((Nickname, done) => {
    return done(null, User.findOne(Nickname))
  })


function checkAuthenticated(req, res, next) {
  console.log("Aqui")
  if (req.isAuthenticated()) {
    return next()
  }
}

function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    next()
  }
}

module.exports = { checkAuthenticated, checkNotAuthenticated}