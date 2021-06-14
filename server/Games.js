const { Game } = require('./Game')
const themeData = require('./data/themes.json')
const { getLoggedTable } = require('./utils')

class Games {
    constructor(room) {
        this.vars(room)
        this.bindMethods()
    }

    vars(room) {
        this.room = room
        this.games = []
    }

    bindMethods() {
        this.removePopupScan = this.removePopupScan.bind(this)
    }

    addLastSocket() {
        const socket = this.room.sockets[this.room.sockets.length - 1]
        this.themeChoice(socket)

        socket.on('load:defeat', () => {
            socket.emit('defeat:loose', this.games.length - 1)
        })
    }

    usersUpdate() {
        this.addLastSocket()
    }

    themeChoice(socket) {
        // listen result theme choice
        socket.on('scan:theme-choice', (idTheme) => {
            console.log('event serveur reçu')
            this.games.forEach((game) => {
                game.endGame()
            })

            const theme = themeData[idTheme]
            this.room.statusOnGame = true

            const game = new Game(this.room, theme, this.games.length + 1)
            this.games.push(game)
        })

        // put the pop up
        socket.on('load:scan', () => {
            socket.broadcast.emit('popup-wait-scan')
            this.room.statusOnScan = true

            const eventsDissable = ['load:room', 'load:result-theme', 'load:winner']
            this.preventLeave(socket, eventsDissable)
        })
    }

    preventLeave(socket, eventsDissable) {
        // remove the pop up
        eventsDissable.forEach((event) => {
            socket.on(event, this.removePopupScan)
        })

        // remove the pop up
        socket.on('disconnect', () => {
            this.room.io.emit('remove-popup-wait-scan')
            this.room.statusOnScan = false
        })
    }

    removePopupScan(id) {
        const socket = getLoggedTable(id, this.room.sockets)

        this.room.io.emit('remove-popup-wait-scan')
        this.room.statusOnScan = false
        this.removeEventScanLeave(socket)
    }

    removeEventScanLeave(socket) {
        const eventsDissable = ['load:room', 'load:result-theme', 'load:winner']

        eventsDissable.forEach((event) => {
            socket.off(event, this.removePopupScan)
        })
    }

    reset() {
        this.games.forEach((game) => {
            game.endGame()
        })

        this.games = []
    }
}

module.exports = {
    Games
}
