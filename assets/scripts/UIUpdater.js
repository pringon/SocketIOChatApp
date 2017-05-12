"use strict"
let localUser = prompt('Please enter your name.')

let checkedUser = $(`li:contains(${localUser})`)

if(checkedUser.length == 0) {
  $('#online-users-list').append(`<b>${localUser}</b>`)
} else {
  checkedUser[0].innerHTML = `<b>${localUser}</b>`
}

let timeoutFunc = () => {
  typing = false
  socket.emit('typing', false)
}

let updateUsers = update => {
  sendMessage(update.message)
  updateUsersList(update.users)
}

let sendMessage = msg => {
  $('#messages').append($('<li>').html(msg))
}

let updateUsersList = users => {
  let usersList = $('#online-users-list')
  usersList.empty()
  for(let user of users) {
    if(user == localUser) {
      usersList.append($('<li>').html(`<b>${user}</b>`))
    } else {
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
