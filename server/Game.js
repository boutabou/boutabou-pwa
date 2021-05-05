const { getUsersWithDashboard, getInteractions, getLoggedTable, getTask } = require('./utils')

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
        this.status = true
    }

    bindMethods() {
        this.resultAction = this.resultAction.bind(this)
    }

    startGame() {
        this.sockets.forEach((socket) => {
            socket.on('load:dashboard', () => {
                if(this.status) {
                    const loggedUser = getLoggedTable(socket.id, this.users)
                    socket.emit('dashboard:display', loggedUser, this.theme)

                    this.newTask(loggedUser, socket)
                    this.listenTask(socket)
                }
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

        this.io.emit('dashboard:update-score', this.score)

        if(this.score >= 10) {
            this.endGame()
            setTimeout(() => { this.io.emit('direction',  '/views/pages/result-theme.ejs') }, 1000)
        }

        if(this.score <= 0) {
            this.endGame()
            setTimeout(() => { this.io.emit('direction',  '/views/pages/defeat.ejs') }, 1000)
        }
    }

    checkTime(task) {
        setTimeout(() =>  {
            if(this.tasks.includes(task)) {
                this.tasks = this.tasks.filter((currentTask) => { return currentTask.idUser !== task.idUser })
                this.newTask(getLoggedTable(task.idUser, this.users), getLoggedTable(task.idUser, this.sockets))
                this.updateScore(false)
            }
        }, task.timer)
    }

    endGame() {
        this.sockets.forEach((socket) => {
            socket.off('interaction:activated', this.resultAction)
            socket.off('load:dashboard', () => {
                const loggedUser = getLoggedTable(socket.id, this.users)
                socket.emit('dashboard:display', loggedUser, this.theme)

                this.newTask(loggedUser, socket)
                this.listenTask(socket)
            })
        })

        this.tasks = []
        this.socket = null
        this.sockets = null
        this.users = null
        this.intaractions = null
        this.status = false
    }
}

module.exports = {
    Game
}
