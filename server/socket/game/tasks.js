let allTasks = []
let currentTasksAsk = []
let score = 0
let user = {}

function initTask(tasks, loggerUser, socket) {
    allTasks = tasks
    currentTasksAsk = []
    user = loggerUser

    giveTask(socket)
    listenTask(socket)
}

function giveTask(socket) {
    const task = allTasks[Math.floor((Math.random() * allTasks.length))]

    console.log('all task ask ', currentTasksAsk, ' from ', user.name)
    console.log('new task ask ', task, ' from ', user.name)

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

    if(user !== {}) {
        console.log('request : ', request)

        currentTasksAsk.push({
            user,
            'name' : task.data.title.replace(/\W/g,'_').toLowerCase(),
            'request' : request.toString().replace(/\W/g,'_').toLowerCase()
        })
    }

    listenTask(socket)
    socket.emit('give-task', finalTask)
}

function listenTask(socket) {
    socket.on('interaction-activated', (interaction) => {
        console.log('tache ask ', currentTasksAsk)
        currentTasksAsk.forEach((currentTaskAsk) => {
            //console.log('current ask : ', currentTaskAsk.name, currentTaskAsk.request)
            //console.log('touch : ', interaction.element.name, interaction.actionMake)
            if(interaction.element.name === currentTaskAsk.name && interaction.actionMake === currentTaskAsk.request ) {
                currentTasksAsk = currentTasksAsk.filter((taskAsk) => {return taskAsk !== currentTasksAsk[0]})
                score++
                console.log(score)
                giveTask(socket, user)
            }
        })
    })
}

module.exports = {
    initTask
}
