"use strict"
const Message = require('../models/message')

module.exports = {

  getMessages: (req, res) => {

    let query = {
      //_chat: req.body.chat,
    }

    if(req.body.lastMessage) {
      query.sentAt = { $gt: req.body.lastMessage }
    }

    res.send(Message.find(query)
                    .limit(20))
  },

  createMessage: (req, res) => {

    new Message({
      text:  req.body.text,
      _user: req.body.user
    }).save(err => {
      if(err) {
        console.log(err)
      }

      res.json()
    })
  }
}
