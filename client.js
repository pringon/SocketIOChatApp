var socket = io()
var timeout = undefined
var typing = false

// CREATE USER
socket.emit('username', prompt('Please enter your name.'))

// ANNOUNCE NEW CONNECTIONS
socket.on('user connection', sendMessage)

// SEND MESSAGES
$('form').submit(function(){
  if(typing) {
    typing = false;
    socket.emit('typing', false)
    clearTimeout(timeout)
  }
  var msg = $('#m').val()
  socket.emit('chat message', $('#m').val())
  $('#m').val('')
  sendMessage(`<b>me:</b> ${msg}`)
  return false
})
socket.on('chat message', sendMessage)

// SEND TYPING NOTIFICATIONS
$('form').on('keydown', function(e) {
  console.log('works')
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

function timeoutFunc() {
  typing = false
  socket.emit('typing', false)
}

function sendMessage(msg) {
  $('#messages').append($('<li>').html(msg))
}

function announceTyping(result) {
  console.log('is working')
  var announcer = $("#typing")
  if(result.typing) {
    announcer.html(`<b>${result.username}</b> is typing.`)
    announcer.css('display', 'inline')
  } else {
    announcer.css('display', 'none')
  }
}
