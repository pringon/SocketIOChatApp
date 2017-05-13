"use strict"
const User     = require("../models/chat"),
      passport = require("passport")

module.exports = {

  getLogin: (req, res) => {
    res.render('pages/login.ejs', { message: req.flash('loginMessage') })
  },

  postLogin: (passport) => {
    return passport.authenticate('local-login', {
      successRedirect: '/chat',
      failureRedirect: '/login',
      failureFlash: true
    })
  },

  getSignup: (req, res) => {
    res.render('pages/signup.ejs', { message: req.flash('signupMessage') })
  },

  postSignup: (passport) => {
    return passport.authenticate('local-signup', {
        successRedirect: '/chat',
        failureRedirect: '/signup',
        failureFlash: true
      })
    },

  logoutUser: (req, res) => {
    req.logout()
    res.redirect('/')
  }

}
