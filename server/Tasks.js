const { getInteractions, getLoggedTable, getRandom } = require('./utils')
const { Task } = require('./Task')

class Tasks {
    constructor(users, sockets, io, theme, timer) {
        this.vars(users, sockets, io, theme, timer)
        this.bindMathods()
        this.listenTasks()
    }

    vars(users, sockets, io, theme, timer) {
        this.all = []
        this.users = users
        this.sockets = sockets
        this.io = io
        this.interactions = getInteractions(this.users, this.sockets)
        this.score = 5
        this.theme = theme
        this.timer = timer
    }

    bindMathods() {
        this.resultAction = this.resultAction.bind(this)
    }

    newTask(user) {
        const socket = getLoggedTable(user.id, this.sockets)
        let interaction = {}
        let cpt = 1
        let max = 0

        while (cpt >= 1 && max < 20) {
            cpt = 0
            max++
            interaction = getRandom(this.interactions.all)

            this.all.forEach((task) => {
                if (task.name === interaction.data.title.replace(/\W/g,'_').toLowerCase()) {
                    cpt ++
                }
            })
        }

        const task = new Task(user.id, interaction)
        socket.emit('dashboard:kill-timer')
        this.all.push(task)
        this.checkTime(task, socket)
        socket.emit('dashboard:display-task', task.sentence, this.timer)
    }

    listenTasks() {
        this.sockets.forEach((socket) => {
            socket.on('interaction:activated', this.resultAction)
        })
    }

    resultAction(userAction, socketId) {
        let delta = -0.5

        // check if userAction is a task ask
        this.all.forEach((task, index) => {
            if(userAction.element.name === task.name && userAction.actionMake === task.request ) {
                this.all.splice(index, 1)
                const userWin = getLoggedTable(task.idUser, this.users)
                this.newTask(userWin)
                this.addPoint(userWin)
                delta = 1
            }
        })
        if(delta == -0.5) {
            const socket = getLoggedTable(socketId, this.sockets)
            socket.emit('dashboard:vibrate')
        }
        this.updateScore(delta)
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
                this.updateScore(-1)
            }
        }, this.timer)
    }

    updateScore(delta) {
        this.score = this.score + delta

        this.io.emit('dashboard:update-score', Math.floor(this.score))

        if(this.score >= 10) {
            setTimeout(() => { this.io.emit('direction',  '/views/pages/result-theme.ejs', this.theme.id) }, 1000)
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
