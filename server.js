var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  socket.broadcast.emit('user connection', 'user connected')
  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  })
  socket.on('disconnect', () => {
    io.emit('user connection', 'user disconnected')
  })
})

http.listen(3000, () => {
  console.log('listening on port 3000')
})
