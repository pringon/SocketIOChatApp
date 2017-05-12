"use strict"
const express        = require('express'),
      app            = express(),
      http           = require('http').Server(app),
      expressLayouts = require('express-ejs-layouts'),
      mongoose       = require('mongoose'),
      passport       = require('passport'),
      flash          = require('connect-flash'),
      logger         = require('morgan'),
      cookieParser   = require('cookie-parser'),
      bodyParser     = require('body-parser'),
      session        = require('express-session'),
      configDB       = require('./config/database.js')

app.set('port', process.env.PORT || 3000)

mongoose.connect(configDB.url)

require('./config/passport')(passport)

app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('view options', { layout: 'layout.ejs' })
app.use('/', express.static(__dirname + '/assets'))
app.use(expressLayouts)

app.use(session({
  secret: (process.env.SECRET || 'drowssap'),
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./app/routes')(app, passport)               //SET ROUTES

require('./app/sockets')(http)

http.listen(app.get('port'), () => {
  console.log('listening on port 3000')
})
