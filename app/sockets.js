"use strict"
module.exports = (http) => {

  const io = require('socket.io')(http)

  io.on('connection', socket => {
    socket.on('username', usr => {
      socket.username = usr
      usersList.push(usr)
      let message = `<b>${usr}</b> has connected.`
      emitUsersList(socket, message)
    })
    socket.on('chat message', msg => {
      socket.broadcast.emit('chat message', `<b>${socket.username}:</b> ${msg}`)
    })
    socket.on('typing', typing => {
      if(typing) {
        socket.broadcast.emit('typing', { typing: true, username: socket.username })
      } else {
        socket.broadcast.emit('typing', { typing: false })
      }
    })
    socket.on('disconnect', () => {
      let userIndex = usersList.indexOf(socket.username)
      if(userIndex !== -1) {
        usersList.splice(userIndex, 1)
      }
      let message = `<b>${socket.username}</b> has disconnected.`
      emitUsersList(socket, message)
    })
  })
}

let emitUsersList = (socket, message) => {

  socket.broadcast.emit('user connection', { message: message,
                                             users: usersList })
}
