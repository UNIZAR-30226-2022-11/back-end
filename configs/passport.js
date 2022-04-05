const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const User = require("../models/user.js");

function initialize(passport) {
  const authenticateUser = async (nickname, password, done) => {
    var user
      console.log("hol")
    User.getUserByNickname(nickname, user)
    if (user == null) {
      console.log(user)
      return done(null, false, { message: 'No user with that nickname' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        //console.log("Error cons")
        return done(null, user)
      } else {
        //console.log("Error cons")
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'nickname' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.nickname))
  passport.deserializeUser((nickname, done) => {
    return done(null, User.getUserByNickname(nickname))
  })
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
}

function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    next()
  }
}

module.exports = {initialize, checkAuthenticated, checkNotAuthenticated}
