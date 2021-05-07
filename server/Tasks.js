const { getInteractions, getLoggedTable, getRandom } = require('./utils')
const { Task } = require('./Task')

class Tasks {
    constructor(users, sockets, io, theme) {
        this.vars(users, sockets, io, theme)
        this.bindMathods()
        this.listenTasks()
    }

    vars(users, sockets, io, theme) {
        this.all = []
        this.users = users
        this.sockets = sockets
        this.io = io
        this.interactions = getInteractions(this.users, this.sockets)
        this.score = 5
        this.theme = theme
    }

    bindMathods() {
        this.resultAction = this.resultAction.bind(this)
    }

    newTask(user) {
        const socket = getLoggedTable(user.id, this.sockets)
        const task = new Task(user.id, getRandom(this.interactions.all))
        socket.emit('dashboard:kill-timer')
        this.all.push(task)
        this.checkTime(task, socket)
        socket.emit('dashboard:display-task', task.sentence, task.timer)
    }

    listenTasks() {
        this.sockets.forEach((socket) => {
            socket.on('interaction:activated', this.resultAction)
        })
    }

    resultAction(userAction, socketId) {
        let valide = false

        // check if userAction is a task ask
        this.all.forEach((task, index) => {
            if(userAction.element.name === task.name && userAction.actionMake === task.request ) {
                this.all.splice(index, 1)
                const userWin = getLoggedTable(task.idUser, this.users)
                this.newTask(userWin)
                this.addPoint(userWin)
                valide = true
            }
        })
        if(!valide) { 
            const socket = getLoggedTable(socketId, this.sockets)
            socket.emit('dashboard:vibrate')
        }
        this.updateScore(valide)
    }

    addPoint(user) {
        if(!user.score[this.theme.title]) {
            user.score[this.theme.title] = 0
        }
        user.score[this.theme.title] ++
    }

    checkTime(task) {
        setTimeout(() =>  {
            if(this.all && this.all.includes(task)) {
                this.all = this.all.filter((currentTask) => { return currentTask.idUser !== task.idUser })
                this.newTask(getLoggedTable(task.idUser, this.users))
                this.updateScore(false)
            }
        }, task.timer)
    }

    updateScore(valide) {
        if (!valide) {
            this.score --
        } else {
            this.score ++
        }

        this.io.emit('dashboard:update-score', this.score)

        if(this.score >= 10) {
            setTimeout(() => { this.io.emit('direction',  '/views/pages/result-theme.ejs') }, 1000)
            this.endGame()
        }

        if(this.score <= 0) {
            setTimeout(() => { this.io.emit('direction',  '/views/pages/defeat.ejs') }, 1000)
            this.endGame()
        }
    }

    endGame() {
        this.sockets.forEach((socket) => {
            socket.off('interaction:activated', this.resultAction)
        })

        this.all = null
        this.users = null
        this.interactions = null
    }
}

module.exports = {
    Tasks
}
