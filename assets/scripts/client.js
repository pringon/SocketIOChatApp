"use strict"
const socket = io()
let timeout = undefined
let typing = false

// CREATE USER
socket.emit('username', localUser)

// ANNOUNCE NEW CONNECTIONS
socket.on('user connection', updateUsers)

// SEND MESSAGES
$('form').submit(() => {
  if(typing) {
    typing = false;
    socket.emit('typing', false)
    clearTimeout(timeout)
  }
  console.log($("#messages-form > input"))
  let msg = $("#messages-form > input").val()
  socket.emit('chat message', $("#messages-form > input").val())
  $('#messages-form > input').val('')
  sendMessage(`<b>me:</b> ${msg}`)
  return false
})
socket.on('chat message', sendMessage)

// SEND TYPING NOTIFICATIONS
$('form').on('keydown', e => {
  if(e.keyCode !== 13) {
    socket.emit('typing', true)
    if(typing) {
      timeout = setTimeout(timeoutFunc, 5000)
    } else {
      typing = true
      clearTimeout(timeout)
      timeout = setTimeout(timeoutFunc, 5000)
    }
  }
})
socket.on('typing', announceTyping)
