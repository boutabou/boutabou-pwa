function getUsersWithDashboard(users, currentTheme) {
    const interaction = require('../../' + currentTheme.pathInteractions)

    users.forEach((user) => {

        delete require.cache[require.resolve('../../data/tables.json')];
        const dashboard = require('../../data/tables.json')

        user.dashboard = dashboard[Math.floor((Math.random() * dashboard.length))]

        user.dashboard.forEach((interactionBoard) => {
            const allDataByType = interaction[interactionBoard.type]
            interactionBoard.data = allDataByType[Math.floor((Math.random() * allDataByType.length))]
        })
    })

    return users
}

module.exports = {
    getUsersWithDashboard
}
