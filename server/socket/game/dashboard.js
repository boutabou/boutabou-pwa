const tables = require('../../data/tables.json')


function initDashboard(users, currentTheme) {
    const interaction = require('../../' + currentTheme.pathInteractions)
    const dashboard = tables
    users.forEach((user) => {
        user.dashboard = dashboard[Math.floor((Math.random() * dashboard.length))]

        user.dashboard.forEach((interactionBoard) => {
            const allDataByType = interaction[interactionBoard.type]
            interactionBoard.data = allDataByType[Math.floor((Math.random() * allDataByType.length))]
        })
    })

    return users
}

function dashboardLoad(socket, loggedUser) {
    socket.emit('dashboard-info', loggedUser)
}

module.exports = {
    dashboardLoad,
    initDashboard
}
