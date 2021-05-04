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
        this.score = 0
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
        })
    }

    newTask(loggedUser, socket) {
        const task = getTask(this.intaractions, loggedUser)
        this.tasks.push(task)
        socket.emit('dashboard:give-task', task.sentence)
    }

    listenTask(socket) {
        socket.on('interaction:activated', this.resultAction)
    }

    resultAction(userAction) {
        let valide = false

        // check if userAction is a task ask
        this.tasks.forEach((task, index) => {
            if(userAction.element.name === task.name && userAction.actionMake === task.request ) {
                this.tasks.splice(index, 1)
                this.newTask(getLoggedTable(task.idUser, this.users), getLoggedTable(task.idUser, this.sockets))
                valide = true
            }
        })

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
                }
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
    }
}

module.exports = {
    Game
}
