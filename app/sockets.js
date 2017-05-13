"use strict"
const redisClient = require("redis").createClient(),
      Message     = require("./models/message")

module.exports = (io) => {

  io.on('connection', socket => {
    socket.on('username', usr => {

      socket.username = usr
      redisClient.sadd("userSessions", usr)
      let message = `<b>${usr}</b> has connected.`
      redisClient.smembers("userSessions", users => {
        emitUsersList(socket, message, users)
      })
    })
    socket.on('chat message', msg => {
      saveMessage(io, socket.username, msg)
      io.sockets.emit('chat message', `<b>${socket.username}:</b> ${msg}`)
    })
    socket.on('typing', typing => {
      if(typing) {
        socket.broadcast.emit('typing', { typing: true, username: socket.username })
      } else {
        socket.broadcast.emit('typing', { typing: false })
      }
    })
    socket.on('disconnect', () => {
      if(typeof socket.username !== 'undefined') {
        redisClient.srem("userSessions", socket.username)
      }

      let message = `<b>${socket.username}</b> has disconnected.`
      redisClient.smembers("userSessions", users => {
        emitUsersList(socket, message, users)
      })
    })
  })
}

let emitUsersList = (socket, message, users) => {

  socket.broadcast.emit('user connection', { message: message,
                                             users: users })
}

let saveMessage = (io, user, text) => {

  new Message({
    text:  text,
    user: user
  }).save(err => {
    if(err) {
      console.log(err)
    }

    io.sockets.emit('chat message', { text: text,
                                      user: user })
  })
}
