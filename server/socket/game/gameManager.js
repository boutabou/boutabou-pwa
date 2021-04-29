const { getUsersWithDashboard } = require('./dashboard')
const { initTask, resetTask } = require('./tasks')

/**
 * La liste de toutes les tâches de tous les tableaux de bord
 */
let tasks = []

/**
 * Les utilisateurs connectés à la room avec son dashboard
 */
let users = []


/**
 * Lancé une fois par game
 */
function initGameVars(io, socket, currentTheme, allUsers) {
    tasks = []

    users = getUsersWithDashboard(allUsers, currentTheme) // return object users with dashboard with datas

    tasks = getTasks()
    resetTask(tasks)

    setTimeout(() => { io.emit('direction',  '/views/pages/game.ejs') }, 1000)
}

/**
 * Lancé une fois par joeur
 */
function initGame(io, socket, loggedUser) {
    socket.emit('dashboard-info', loggedUser)
    initTask(socket, io)
}

function getTasks() {
    const allTasks = []

    users.forEach((user) => {
        user.dashboard.forEach((interaction) => {
            allTasks.push(interaction)
        })
    })

    return allTasks
}

module.exports = {
    initGame,
    initGameVars
}
