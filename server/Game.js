const { getUsersWithDashboard, getInteractions, getLoggedTable, getTask } = require('./utils')
const { checkTime } = require('./Task')

class Game {
    constructor(io, socket, users, theme, sockets) {
        this.vars(io, socket, users, theme, sockets)
        this.startGame()
    }

    vars(io, socket, users, theme, sockets) {
        this.io = io
        this.socket = socket
        this.sockets = sockets
        this.theme = theme
        this.users = getUsersWithDashboard(users, this.theme)
        this.intaractions = getInteractions(this.users)
        this.score = 0
        this.tasks = []
    }

    startGame() {
        setTimeout(() => { this.io.emit('direction',  '/views/pages/game.ejs') }, 3000)

        this.sockets.forEach((socket) => {
            socket.on('load:dashboard', () => {
                const loggedUser = getLoggedTable(socket.id, this.users)
                socket.emit('dashboard:display', loggedUser)

                this.newTask(loggedUser, socket)
                this.listenTask(socket)
            })
        })
    }

    newTask(loggedUser, socket) {
        const task = getTask(this.intaractions, loggedUser)
        this.tasks.push(task)
        
        socket.emit('dashboard:give-task', task.sentence)
        socket.emit('dashboard:reset-timer', task.timer)
        this.checkTime(task, socket)
    }

    listenTask(socket) {
        socket.on('interaction:activated', (userAction) => {
            this.tasks.forEach((task, index) => {
                if(userAction.element.name === task.name && userAction.actionMake === task.request ) {
                    this.tasks.splice(index, 1)
                    this.score ++
                    this.newTask(getLoggedTable(task.idUser, this.users), getLoggedTable(task.idUser, this.sockets))
                }
            })
        })
    }

    checkTime(task) {
        let index = this.tasks.indexOf(task)
        setTimeout(() =>  {
            if(this.tasks.includes(task)) {
                this.tasks.splice(index, 1)
                this.newTask(getLoggedTable(task.idUser, this.users), getLoggedTable(task.idUser, this.sockets))
            }
        }, task.timer)
    }

}

module.exports = {
    Game
}
