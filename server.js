var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  socket.on('username', usr => {
    socket.username = usr
    socket.broadcast.emit('user connection', `<b>${usr}</b> has connected.`)
  })
  socket.on('chat message', msg => {
    socket.broadcast.emit('chat message', `<b>${socket.username}:</b> ${msg}`)
  })
  socket.on('disconnect', () => {
    io.emit('user connection', `<b>${socket.username}</b> has disconnected.`)
  })
})

http.listen(3000, () => {
  console.log('listening on port 3000')
})
