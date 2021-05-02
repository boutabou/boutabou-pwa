const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 3003

const { initRouter } = require('./server/router')
const { initSocket } = require('./server/socket/socketManager')

initRouter(app, __dirname, port)
initSocket(io)

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`)
})
