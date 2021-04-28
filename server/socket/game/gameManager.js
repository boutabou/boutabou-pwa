const { dashboardLoad, initDashboard } = require('./dashboard')
const { initTask } = require('./tasks')

/**
 * La liste de toutes les tâches de tous les tableaux de bord
 */
let tasks = []

/**
 * Les utilisateurs connectés à la room
 */
let users = []

function gameInit(io, users, currentTheme) {

    tasks = []

    users = initDashboard(users, currentTheme) // return object users with dashboard with datas
    setTimeout(() => { io.emit('direction',  '/views/pages/game.ejs') }, 1000)

    users.forEach((user) => {
        user.dashboard.forEach((interaction) => {
            tasks.push(interaction)
        })
    })
}

function gameTaskInit(socket, loggedUser) {
    dashboardLoad(socket, loggedUser)

    initTask(tasks, loggedUser, socket)
}

module.exports = {
    gameInit,
    gameTaskInit
}
