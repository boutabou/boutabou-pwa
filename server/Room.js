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
        this.statusWaitUser = true
        this.statusOnScan = false
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

        if (this.users.length === 0 ) {
            this.statusWaitUser = true
            this.statusOnScan = false
        }

        if(this.statusWaitUser) {
            this.users.push(loggedUser)
            this.sockets.push(socket)

            socket.on('load:room', this.displayUser)
            socket.on('disconnect', () => { this.disconnection(loggedUser) })

            if(this.statusOnScan) {
                socket.on('load:room', () => { socket.emit('popup-wait-scan') })
            }

        } else {
            socket.on('load:room', () => { socket.emit('room:popup-wait-room') })
        }
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
        socket.on('room:scan-button-clicked', this.themeOnChoice)
        socket.on('winner:scan-button-clicked', this.themeOnChoice)
        socket.on('result-theme:scan-button-clicked', this.themeOnChoice)
    }

    async themeOnChoice(id) {
        this.statusOnScan = true
        const lengthGames = this.games.length

        this.theme = undefined
        this.socketChoosenTheme = getLoggedTable(id, this.sockets)

        this.socketChoosenTheme.broadcast.emit('popup-wait-scan')
        this.socketChoosenTheme.on('disconnect', this.redirect)
        this.socketChoosenTheme.on('load:room', this.redirect)
        this.socketChoosenTheme.on('load:winner', this.redirect)
        this.socketChoosenTheme.on('load:result-theme', this.redirect)

        this.theme = await getTheme(this.socketChoosenTheme)

        if(this.games.length < lengthGames + 1) {
            this.statusWaitUser = false

            if (this.game) {
                this.game.endGame()
            }

            this.io.emit('direction',  '/views/pages/theme.ejs')
            setTimeout(() => { this.io.emit('theme:on-timer', 3) }, 2000)

            this.socketChoosenTheme.on('load:theme', () => { this.io.emit('theme:selected', this.theme) })

            this.timer = 10000 + 2000 * this.users.length - (( 1 - Math.exp(-this.games.length / 4)) * 6000)
            this.game = new Game(this.io, this.socketChoosenTheme, this.users, this.theme, this.sockets, this.timer, this.games.length) 
            this.games.push(this.game)

            setTimeout(() => { 
                this.io.emit('direction',  '/views/pages/game.ejs')
            }, 5200)
        }

        this.sockets.forEach((socket) => {
            socket.on('load:defeat', () => {
                socket.emit('defeat:loose', lengthGames - 1)
            })
        })
    }

    redirect() {
        if(!this.theme) {
            this.socketChoosenTheme.broadcast.emit('remove-popup-wait-scan')
            this.socketChoosenTheme.off('disconnect', this.redirect)
            this.socketChoosenTheme.off('load:room', this.redirect)
            this.socketChoosenTheme.off('load:winner', this.redirect)
            this.socketChoosenTheme.off('load:result-theme', this.redirect)
            this.statusOnScan = false
        }
    }
}

module.exports = {
    Room
}
