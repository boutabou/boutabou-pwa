const { getUser, getTheme, getLoggedTable } = require('./utils')
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
        this.displayUser = this.displayUser.bind(this)
        this.redirect = this.redirect.bind(this)
        this.themeOnChoice = this.themeOnChoice.bind(this)
    }

    initRoom() {
        this.io.on('connection', (socket) => {
            this.initUser(socket)
            this.initGame(socket)
        })
    }

    async initUser(socket) {
        const loggedUser = await getUser(socket)
        this.users.push(loggedUser)
        this.sockets.push(socket)

        socket.on('load:room', this.displayUser)
        socket.on('disconnect', () => { this.disconnection(loggedUser) })
    }

    displayUser() {
        this.io.emit('room:display-users', this.users)
    }

    disconnection(loggedUser) {
        this.users = this.users.filter((user) => { return user !== loggedUser})
        this.sockets = this.sockets.filter((socket) => { return socket.id !== loggedUser.id })
        this.io.emit('room:display-users', this.users)

        if(this.users.length === 0) {
            this.games = []
        }
    }

    initGame(socket) {
        socket.on('load:scan', this.themeOnChoice)
    }

    async themeOnChoice(id) {
        const lengthGames = this.games.length

        this.theme = undefined
        this.socketChoosenTheme = getLoggedTable(id, this.sockets)

        this.socketChoosenTheme.broadcast.emit('direction',  '/views/pages/wait-scan.ejs')
        this.socketChoosenTheme.on('disconnect', this.redirect)
        this.socketChoosenTheme.on('load:room', this.redirect)
        this.socketChoosenTheme.on('load:result-theme', this.redirect)

        this.theme = await getTheme(this.socketChoosenTheme)

        if(this.games.length < lengthGames + 1) {
            if (this.game) {
                this.game.endGame()
            }

            this.io.emit('direction',  '/views/pages/theme.ejs')

            this.socketChoosenTheme.on('load:theme', () => { this.io.emit('theme:selected', this.theme) })
            this.game = new Game(this.io, this.socketChoosenTheme, this.users, this.theme, this.sockets)
            this.games.push(this.game)

            setTimeout(() => { this.io.emit('direction',  '/views/pages/game.ejs') }, 5200)
        }
    }

    redirect() {
        if(!this.theme) {
            this.socketChoosenTheme.broadcast.emit('direction',  '/views/pages/room.ejs')
            this.socketChoosenTheme.off('disconnect', this.redirect)
            this.socketChoosenTheme.off('load:room', this.redirect)
            this.socketChoosenTheme.off('load:result-theme', this.redirect)
        }
    }
}

module.exports = {
    Room
}