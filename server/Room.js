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
        this.statusOnGame = false
        this.statusOnScan = false
        this.theme = undefined
    }

    bindMethods() {
        this.disconnection = this.disconnection.bind(this)
        this.displayUser = this.displayUser.bind(this)
        this.leaveScan = this.leaveScan.bind(this)
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

        if(!this.statusOnGame) {
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

    initGame(socket) {
        socket.on('load:scan', this.themeOnChoice)
    }

    displayUser() {
        this.io.emit('room:display-users', this.users)
    }

    async themeOnChoice(id) {
        this.statusOnScan = true
        const lengthGames = this.games.length
        this.theme = undefined
        this.socketChoosenTheme = getLoggedTable(id, this.sockets)

        this.socketChoosenTheme.broadcast.emit('popup-wait-scan')

        this.preventLeaveScan(this.socketChoosenTheme)

        this.theme = await getTheme(this.socketChoosenTheme)
        // console.log('theme Chose : ', this.theme.title)

        if(this.games.length < lengthGames + 1) {
            this.statusOnGame = true

            if (this.game) {
                this.game.endGame()
            }

            this.io.emit('direction',  '/views/pages/theme.ejs')

            this.socketChoosenTheme.on('load:theme', () => { this.io.emit('theme:selected', this.theme) })

            // console.log('ici')
            this.sockets.forEach((socket) => {
                // console.log('ici 2')
                socket.on('load:dashboard',  () => {
                    // console.log('ici 3')
                    // console.log(socket.id)
                    socket.broadcast.emit('direction',  '/views/pages/game.ejs')
                   setTimeout(() => {  this.io.emit('dashboard:on-timer') }, 1000)
                })
            })

            this.timer = 10000 + 2000 * this.users.length - (( 1 - Math.exp(-this.games.length / 4)) * 6000)
            this.game = new Game(this.io, this.socketChoosenTheme, this.users, this.theme, this.sockets, this.timer)
            this.games.push(this.game)
        }

        this.sockets.forEach((socket) => {
            socket.on('load:defeat', () => {
                socket.emit('defeat:loose', lengthGames - 1)
            })
        })
    }

    preventLeaveScan(socket) {
        socket.on('disconnect', this.leaveScan)
        socket.on('load:room', this.leaveScan)
        socket.on('load:winner', this.leaveScan)
        socket.on('load:result-theme', this.leaveScan)
    }

    leaveScan() {
        if(!this.theme) {
            this.socketChoosenTheme.broadcast.emit('remove-popup-wait-scan')
            this.socketChoosenTheme.off('disconnect', this.leaveScan)
            this.socketChoosenTheme.off('load:room', this.leaveScan)
            this.socketChoosenTheme.off('load:winner', this.leaveScan)
            this.socketChoosenTheme.off('load:result-theme', this.leaveScan)
            this.statusOnScan = false
        }
    }

    disconnection(loggedUser) {
        // remove user
        this.users = this.users.filter((user) => { return user !== loggedUser})
        this.sockets = this.sockets.filter((socket) => { return socket.id !== loggedUser.id })

        // update room
        this.displayUser()

        // reset room
        if(this.users.length === 0) {
            this.vars(this.io)
        }
    }

    getTheme() {
        return this.theme
    }
}

module.exports = {
    Room
}
