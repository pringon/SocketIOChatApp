"use strict"

let timeoutFunc = () => {
  typing = false
  socket.emit('typing', false)
}

let updateUsers = update => {
  sendUpdate(update.message)
  updateUsersList(update.users)
}

let sendMessage = msg => {
  if(msg.user.toLowerCase() == localUser.toLowerCase()) {
    $('#messages').append($('<li>').html(`<b>You</b>: ${msg.text}`))
  } else {
    $('#messages').append($('<li>').html(`<b>${msg.user}</b>: ${msg.text}`))
  }
}

let sendUpdate = update => {
  $('#messages').append($('<li>').html(update))
}

let updateUsersList = users => {
  let usersList = $('#online-users-list')
  usersList.empty()
  usersList.append($('<li>').html(`<b>${localUser}</b>`))
  for(let user of users) {
    if(user !== localUser) {
      usersList.append($('<li>').html(user))
    }
  }
}

let announceTyping = result => {
  let announcer = $("#typing")
  if(result.typing) {
    announcer.html(`<b>${result.username}</b> is typing.`)
    announcer.css('display', 'inline')
  } else {
    announcer.css('display', 'none')
  }
}
