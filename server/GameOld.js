const { getUsersWithDashboard, getLoggedTable } = require('./utils')
const { Tasks } = require('./Tasks')

class GameOld {
    constructor(io, socket, users, theme, sockets, timer) {
        this.vars(io, socket, users, theme, sockets, timer)
        this.bindMethods()
        this.startGame()
    }

    vars(io, socket, users, theme, sockets, timer) {
        this.io = io
        this.socket = socket
        this.sockets = sockets
        this.theme = theme
        this.timer = timer
        this.users = getUsersWithDashboard(users, this.theme)
        this.tasks = new Tasks(this.users, this.sockets, this.io, this.theme, this.timer)
    }

    bindMethods() {
        this.initUser = this.initUser.bind(this)
        this.giveDataResultTheme = this.giveDataResultTheme.bind(this)
        this.giveWinnerOfTheme = this.giveWinnerOfTheme.bind(this)
    }

    startGame() {
        this.sockets.forEach((socket) => {
            socket.on('load:dashboard', this.initUser)
            socket.on('load:result-theme', this.giveDataResultTheme)
            socket.on('load:winner', this.giveWinnerOfTheme )
        })
    }

    initUser(id) {
        const socket = getLoggedTable(id, this.sockets)
        const user = getLoggedTable(socket.id, this.users)
        socket.emit('dashboard:display', user, this.theme)
        socket.on('dashboard:start', () => {
            this.tasks.newTask(user)
        })
    }

    giveDataResultTheme(id) {
        const socket = getLoggedTable(id, this.sockets)
        socket.emit('result-theme:win', this.theme)
    }

    giveWinnerOfTheme(id) {

        const socket = getLoggedTable(id, this.sockets)
        const scoreMax =  Math.max.apply(Math, this.users.map((user) => { return user.score[this.theme.title] }))
        this.users.forEach((user) => {
            if(user.score[this.theme.title] === scoreMax) {
                this.winner = user
                return
            }
        })

        socket.emit('winner:display-winner', this.theme, this.winner)
    }


    endGame() {
        if(this.sockets) {
            this.sockets.forEach((socket) => {
                socket.off('load:dashboard', this.initUser)
                socket.off('load:result-theme', this.giveDataResultTheme)
                socket.off('load:winner', this.giveWinnerOfTheme)
            })
        }
    }
}

module.exports = {
    GameOld
}
