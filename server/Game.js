const { getUsersWithDashboard, getLoggedTable } = require('./utils')
const { Tasks } = require('./Tasks')

class Game {
    constructor(room, theme, level) {
        this.vars(room, theme, level)
        this.bindMethods()
        this.initGame()
    }

    vars(room, theme, level) {
        this.room = room
        this.theme = theme
        this.level = level
        this.timer = this.getTimer()
        this.onGame = true
        this.players = getUsersWithDashboard(this.room.users, this.theme)
        this.tasks = new Tasks(this.room.users, this.room.sockets, this.room.io, this.theme, this.timer)
    }

    bindMethods() {
        this.startGame = this.startGame.bind(this)
        this.clickStart = this.clickStart.bind(this)
        this.giveDataResultTheme = this.giveDataResultTheme.bind(this)
        this.giveWinnerOfTheme = this.giveWinnerOfTheme.bind(this)
    }

    initGame() {
        this.room.io.emit('direction',  '/views/pages/theme.ejs')

        this.room.sockets.forEach((socket) => {
            socket.on('theme:start', this.clickStart)
        })
    }

    clickStart(id) {
        if(this.onGame) {
            const socket = getLoggedTable(id, this.room.sockets)
            socket.broadcast.emit('direction',  '/views/pages/game.ejs')
            setTimeout(() => { this.room.io.emit('dashboard:on-timer') }, 1000)
            setTimeout(this.startGame, 5000)
        }
    }

    startGame() {
        this.initUsers()
    }

    initUsers() {
        this.room.sockets.forEach((socket) => {
            const user = getLoggedTable(socket.id, this.players)
            socket.emit('dashboard:display', user, this.theme)
            this.tasks.newTask(user)
            socket.on('load:winner', this.giveWinnerOfTheme )
        })
    }

    giveDataResultTheme(id) {
        const socket = getLoggedTable(id, this.room.sockets)
        socket.emit('result-theme:win', this.theme)
    }

    giveWinnerOfTheme(id) {
        if(this.onGame) {
            const socket = getLoggedTable(id, this.room.sockets)
            const scoreMax =  Math.max.apply(Math, this.room.users.map((user) => { return user.score[this.theme.title] }))
            this.room.users.forEach((user) => {
                if(user.score[this.theme.title] === scoreMax) {
                    this.winner = user
                    return
                }
            })

            socket.emit('winner:display-winner', this.theme, this.winner)
        }
    }

    getTimer() {
        return 10000 + 2000 * this.room.users.length - (( 1 - Math.exp(-this.level / 4)) * 6000)
    }


    endGame() {
        this.onGame = false
        if(this.room.sockets) {
            this.room.sockets.forEach((socket) => {
                socket.off('theme:start', this.clickStart)
                socket.off('load:winner', this.giveWinnerOfTheme)
            })
        }

        this.tasks.endGame()
    }

    getTheme() {
        return this.theme
    }
}

module.exports = {
    Game
}
