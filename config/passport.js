"use strict"
const LocalStrategy = require("passport-local").Strategy,
      User          = require("../app/models/user")

module.exports = (passport) => {

  //============================================================================
  //PASSPORT SERIALIZATION =====================================================
  //============================================================================

    passport.serializeUser((user, done) => {
      done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
        done(err, user)
      })
    })

  //============================================================================
  //LOCAL SIGNUP ===============================================================
  //============================================================================

    passport.use("local-signup", new LocalStrategy({
      usernameField:    "email",
      passwordField: "password",
      passReqToCallback: true
    }, (req, email, password, done) => {

      process.nextTick(() => {

        let name = req.body.name
        User.findOne({ $or: [{ "email": email }, { "name": name }] }, (err, user) => {

          if(err) {
            return done(err)
          }

          if(user) {
            if(user.name == name) {
              return done(null, false, req.flash("signupMessage", "This username is already taken."))
            } else {
              return done(null, false, req.flash("signupMessage", "This email is already taken."))
            }
          } else {


            let newUser = new User()

            newUser.name     = name
            newUser.email    = email
            newUser.password = newUser.generateHash(password)

            newUser.save(err => {
              if(err) {
                throw err
              }
              return done(null, newUser)
            })

          }
        })
      })

    }))

  //============================================================================
  //LOCAL LOGIN ================================================================
  //============================================================================

  passport.use("local-login", new LocalStrategy({

    usernameField: "name",
    passwordField: "password",
    passReqToCallback: true
  }, (req, name, password, done) => {

    User.findOne({ $or: [{ name: name }, { email: name }] }, (err, user) => {
      
      if(err) {
        return done(err)
      }

      if(!user) {

        return done(null, false, req.flash("loginMessage", "User not found."))
      }

      if(!user.validPassword(password)) {

        return done(null, false, req.flash("loginMessage", "Wrong password."))
      }


      return done(null, user)
    })
  }))
}
