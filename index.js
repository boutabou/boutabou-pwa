const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 3003

const { initRouter } = require('./server/router')
const { Room } = require('./server/Room')

initRouter(app, __dirname, port)
const room = new Room(io)

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`)
})
