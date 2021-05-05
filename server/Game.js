const { getUsersWithDashboard, getInteractions, getLoggedTable, getTask } = require('./utils')
const { checkTime } = require('./Task')

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
        this.intaractions = getInteractions(this.users)
        this.score = 5
        this.tasks = []
    }

    bindMethods() {
        this.resultAction = this.resultAction.bind(this)
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

            socket.on('load:result-theme', () => {
                socket.emit('result-theme:win', this.theme)
            })
        })
    }

    newTask(loggedUser, socket) {
        const task = getTask(this.intaractions, loggedUser)
        this.tasks.push(task)
        
        socket.emit('dashboard:give-task', task.sentence)
        this.checkTime(task, socket)
        socket.emit('dashboard:reset-timer', task.timer)
    }

    listenTask(socket) {
        socket.on('interaction:activated', this.resultAction)
    }

    resultAction(userAction) {
        let valide = false

        // update status interaction
        this.intaractions.forEach((interaction) => {
            if(interaction.data.title.replace(/\W/g,'_').toLowerCase() === userAction.element.name) {
                switch (interaction.type) {
                    case 'bool':
                        if (interaction.status === 'on') {
                            interaction.status = 'off'
                        } else {
                            interaction.status = 'on'
                        }
                        break
                    case 'simple-cursor':
                    case 'complex-cursor':
                    case 'rotate':
                        interaction.status = userAction.actionMake
                }
            }
        })

        // check if userAction is a task ask
        this.tasks.forEach((task, index) => {
            if(userAction.element.name === task.name && userAction.actionMake === task.request ) {
                this.tasks.splice(index, 1)
                let currentSocketTask = getLoggedTable(task.idUser, this.sockets)
                currentSocketTask.emit('dashboard:kill-timer')
                this.newTask(getLoggedTable(task.idUser, this.users), currentSocketTask)
                valide = true
            }
        })

        this.updateScore(valide)
    }

    updateScore(valide) {
        if (!valide) {
            this.score --
        } else {
            this.score ++
        }

        if(this.score >= 6) {
            setTimeout(() => { this.io.emit('direction',  '/views/pages/result-theme.ejs') }, 1000)
        }

        if(this.score <= 0) {
            this.io.emit()
            this.io.emit()
        }

        this.io.emit('dashboard:update-score', this.score)
    }

    checkTime(task) {
        setTimeout(() =>  {
            if(this.tasks.includes(task)) {
                this.tasks = this.tasks.filter((currentTask) => { return currentTask.idUser !== task.idUser })
                this.newTask(getLoggedTable(task.idUser, this.users), getLoggedTable(task.idUser, this.sockets))
            }
        }, task.timer)
    }

}

module.exports = {
    Game
}
