let tasks = []
let currentTasksAsk = []
let score = 0
let io

function resetTask(allTask) {
    tasks = allTask
    currentTasksAsk = []
    score = 0
}

function initTask(socket, getIo) {
    giveTask(socket)
    io = getIo
    listenTasks(socket)
    listenTaskCompleted(socket)
}

function giveTask(socket) {
    const task = tasks[Math.floor((Math.random() * tasks.length))]
    let finalTask = ''
    let request = ''

    switch (task.type) {
        case 'bool':
            if (task.data.currentValue && task.data.currentValue === "OFF") {
                finalTask = "Désactiver la " + task.data.title
                request = "OFF"
                task.data.currentValue = "ON"
            } else {
                finalTask = "Activer la " + task.data.title
                request = "ON"
                task.data.currentValue = "OFF"
            }
            break
        case 'simple-list':
            const paramSimple = task.data.param
            finalTask = "Enclencher le " + task.data.title + " " + paramSimple
            request = paramSimple
            break
        case 'complex-list':
            const param = task.data.param[Math.floor((Math.random() * task.data.param.length))]
            finalTask = "Enclencher le " + task.data.title + " " + param
            request = param
            break
        case 'simple-cursor':
        case 'complex-cursor':
        case 'rotate':
            const step = task.data.step[Math.floor((Math.random() * task.data.step.length))]
            finalTask = "Mettre le " + task.data.title + " sur " + step
            request = step
            break

    }

    currentTasksAsk.push({
        'idPlayer' : socket.id,
        'name' : task.data.title.replace(/\W/g,'_').toLowerCase(),
        'request' : request.toString().replace(/\W/g,'_').toLowerCase()
    })

    socket.emit('give-task', finalTask)

    socket.broadcast.emit('add-task-global', finalTask)
}

function listenTasks(socket) {
    socket.on('interaction-activated', (interaction) => {
        currentTasksAsk.forEach((currentTaskAsk) => {
            if(interaction.element.name === currentTaskAsk.name && interaction.actionMake === currentTaskAsk.request ) {
                io.to(currentTaskAsk.idPlayer).emit('task-completed', currentTaskAsk)
            }
        })
    })
}

function listenTaskCompleted(socket) {
    socket.on('task-completed-send', (task) => {
        currentTasksAsk = currentTasksAsk.filter((taskAsk) => { return taskAsk.idPlayer !== task.idPlayer })
        score++

        giveTask(socket)
    })
}

module.exports = {
    resetTask,
    initTask
}
