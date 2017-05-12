"use strict"
const usersController =    require('./controllers/users.controller'),
      chatsController =    require('./controllers/chats.controller'),
      messagesController = require('./controllers/messages.controller')

module.exports = (app, passport) => {

  //app.get('/', chatsController.getChat)
  app.get('/', isNotLoggedIn, (req, res) => {
    res.render('pages/index.ejs')
  })
  app.get('/chat', isLoggedIn, chatsController.getChat)

  app.get('/login', isNotLoggedIn, usersController.getLogin)
  app.post('/login', isNotLoggedIn, usersController.postLogin(passport))
  app.get('/signup', isNotLoggedIn,  usersController.getSignup)
  app.post('/signup', isNotLoggedIn, usersController.postSignup(passport), (req, res) => {
    console.log("intra")
  })
  app.get('/logout', isLoggedIn, usersController.logoutUser)

}

let isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

let isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    return next();
  }

  res.redirect('/chat')
}
