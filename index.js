const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 3003

const { initRouter } = require('./server/router')
const { Room } = require('./server/Room')

const room = new Room(io)
initRouter(app, __dirname, port, room)

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`)
})
