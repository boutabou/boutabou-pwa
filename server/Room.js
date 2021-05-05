const { getUser, getTheme } = require('./utils')
const { Game } = require('./Game')

class Room {
    constructor(io) {
        this.vars(io)
        this.bindMethods()
        this.initRoom()
    }

    vars(io) {
        this.io = io
        this.users = []
        this.sockets = []
        this.games = []
        this.game = null
    }

    bindMethods() {
        this.disconnection = this.disconnection.bind(this)
    }

    initRoom() {
        this.io.on('connection', (socket) => {
            this.initUser(socket)
            this.initGame(this.io, socket, this.users)
        })
    }

    async initUser(socket) {
        const loggedUser = await getUser(socket)
        this.users.push(loggedUser)
        this.sockets.push(socket)

        socket.on('load:room', () => {  this.io.emit('room:display-users', this.users) })
        socket.on('disconnect', () => { this.disconnection(loggedUser) })
    }

    disconnection(loggedUser) {
        this.users = this.users.filter((user) => { return user !== loggedUser})
        this.sockets = this.sockets.filter((socket) => { return socket.id !== loggedUser.id })
        this.io.emit('room:display-users', this.users)

        if(this.users.length === 0) {
            this.games = []
        }
    }

    async initGame(io, socket) {
        socket.on('load:scan', async () => {
            socket.broadcast.emit('direction',  '/views/pages/wait-scan.ejs')

            const theme = await getTheme(socket)
            this.io.emit('direction',  '/views/pages/theme.ejs')

             /* const theme = {
                  "title" : "Les régles",
                  "img" : "../../assets/images/themes/regles.jpg",
                  "pathInteractions" : "data/interactions/menstruation.json"
              }

            setTimeout(() => {
                this.io.emit('direction',  '/views/pages/theme.ejs')
            }, 1000)*/

            socket.on('load:theme', () => { this.io.emit('theme:selected', theme) })

            if(this.game === null) {
                console.log('new instance')
                this.game = new Game(io, socket, this.users, theme, this.sockets)
            } else {
                this.game.changeTheme(theme)
            }

            setTimeout(() => { this.io.emit('direction',  '/views/pages/game.ejs') }, 3000)
        })
    }
}

module.exports = {
    Room
}
