const { getInteractions, getLoggedTable, getRandom } = require('./utils')
const { Task } = require('./Task')

class Tasks {
    constructor(users, sockets, io) {
        this.vars(users, sockets, io)
        this.bindMathods()
        this.listenTasks()
    }

    vars(users, sockets, io) {
        this.all = []
        this.users = users
        this.sockets = sockets
        this.io = io
        this.interactions = getInteractions(this.users, this.sockets)
        this.score = 5
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

    resultAction(userAction) {
        let valide = false

        // check if userAction is a task ask
        this.all.forEach((task, index) => {
            if(userAction.element.name === task.name && userAction.actionMake === task.request ) {
                this.all.splice(index, 1)
                this.newTask(getLoggedTable(task.idUser, this.users))
                valide = true
            }
        })

        this.updateScore(valide)
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

        if(this.score >= 6) {
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
