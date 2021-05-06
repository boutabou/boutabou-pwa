const { getUsersWithDashboard, getLoggedTable } = require('./utils')
const { Tasks } = require('./Tasks')

class Game {
    constructor(io, socket, users, theme, sockets) {
        this.vars(io, socket, users, theme, sockets)
        this.bindMethods()
        this.startGame()
    }

    vars(io, socket, users, theme, sockets) {
        this.io = io
        this.socket = socket
        this.sockets = sockets
        this.theme = theme
        this.users = getUsersWithDashboard(users, this.theme)
        this.tasks = new Tasks(this.users, this.sockets, this.io)
    }

    bindMethods() {
        this.initUser = this.initUser.bind(this)
        this.giveDataResultTheme = this.giveDataResultTheme.bind(this)
    }

    startGame() {
        this.sockets.forEach((socket) => {
            socket.on('load:dashboard', this.initUser)
            socket.on('load:result-theme', this.giveDataResultTheme)
        }) 
    }

    initUser(id) {
        const socket = getLoggedTable(id, this.sockets)
        const user = getLoggedTable(socket.id, this.users)
        socket.emit('dashboard:display', user, this.theme)
        this.tasks.newTask(user)
    }

    giveDataResultTheme(id) {
        const socket = getLoggedTable(id, this.sockets)
        socket.emit('result-theme:win', this.theme)
    }

    endGame() {
        if(this.sockets) {
            this.sockets.forEach((socket) => {
                socket.off('load:dashboard', this.initUser)
                socket.off('load:result-theme', this.giveDataResultTheme)
            })
        }

        this.tasks.endGame()
        this.socket = null
        this.sockets = null
        this.users = null
    }
}

module.exports = {
    Game
}
