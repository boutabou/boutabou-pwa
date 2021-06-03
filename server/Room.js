const { getUser } = require('./utils')
const { Games } = require('./Games')

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
        this.statusOnGame = false
        this.statusOnScan = false
    }

    bindMethods() {
        this.disconnection = this.disconnection.bind(this)
        this.displayUser = this.displayUser.bind(this)
    }

    initRoom() {
        this.io.on('connection', (socket) => {
            this.initUser(socket)
        })

        this.games = new Games(this)
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

        this.games.usersUpdate()
    }

    displayUser() {
        this.io.emit('room:display-users', this.users)
    }

    disconnection(loggedUser) {
        // remove user
        this.users = this.users.filter((user) => { return user !== loggedUser})
        this.sockets = this.sockets.filter((socket) => { return socket.id !== loggedUser.id })

        // update front room
        this.displayUser()

        // update games
        if(this.users.length !== 0) {
            this.games.usersUpdate()
        }

        // reset room
        if(this.users.length === 0) {
            this.vars(this.io)
            this.games.reset()
        }
    }

    getTheme() {
        if(this.users.length === 0) {
            return undefined
        }

        return this.games.getTheme()
    }
}

module.exports = {
    Room
}
