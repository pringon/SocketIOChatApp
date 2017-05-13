"use strict"
const Message     = require("../models/message"),
      redisClient = require("redis").createClient()

module.exports = {

  getChat: (req, res) => {

    Message.find().sort([["sentAt", "descending"]]).limit(20).exec((err, recentMessages) => {
      redisClient.smembers("userSessions", (err, users) => {

            let params = {
              currentUser: req.user.name,
              onlineUsers: users,
              messages:    recentMessages
            }

            res.render('pages/chat.ejs', params)
      })
    })

  }
}
