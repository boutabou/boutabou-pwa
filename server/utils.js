const { User } = require('./User')
const { Task } = require('./Task')
const theme = require('./data/themes.json')

function getUser(socket) {
    const promise  = new Promise((resolve, reject) => {
        socket.on('room:user-login', (name) => {

            const user = new User(name, socket.id)

            if (user) {
                resolve(user)
            } else {
                reject(user)
            }
        })
    })

    return promise
}

function getTheme(socket) {
    const promise = new Promise((resolve, reject) => {
        socket.on('theme-choice', message => {
            if (theme[message]) {
                resolve(theme[message])
            } else {
                reject(theme[message])
            }
        })
    })

    return promise
}

function getUsersWithDashboard(users, currentTheme) {
    const interactions = require('./' + currentTheme.pathInteractions)

    const types = ['bool', 'simple-list', 'complex-list', 'simple-cursor', 'complex-cursor', 'rotate']

    types.forEach((type) => {
        interactions[type].forEach((interaction) => {
            interaction.useInDashboard = 0
        })
    })

    users.forEach((user) => {
        delete require.cache[require.resolve('./data/tables.json')]
        const dashboard = require('./data/tables.json')

        user.dashboard = dashboard[Math.floor((Math.random() * dashboard.length))]

        user.dashboard.forEach((interactionBoard) => {
            const allDataByType = interactions[interactionBoard.type]

            let seuil = 1
            const tabUseInDashboard = []

            allDataByType.forEach((interaction) => {
                tabUseInDashboard.push(interaction.useInDashboard || 0)
            })

            seuil = Math.min(...tabUseInDashboard) + 1

            let alea = Math.floor((Math.random() * allDataByType.length))

            while (allDataByType[alea].useInDashboard >= seuil) {
                alea = Math.floor((Math.random() * allDataByType.length))
            }

            interactionBoard.data = allDataByType[alea]
            allDataByType[alea].useInDashboard ++

            if(interactionBoard.data.type === 'bool') {
                interactionBoard.data.status = 'on'
            }
        })
    })

    return users
}

function getInteractions(users) {
    const interactions = []

    users.forEach((user) => {
        user.dashboard.forEach((interaction) => {
            switch (interaction.type) {
                case 'bool':
                    interaction.status = 'on'
                    break
                case 'simple-cursor':
                case 'complex-cursor':
                case 'rotate':
                    interaction.status = interaction.data.param[0]
                    break
            }

            interactions.push(interaction)
        })
    })

    return interactions
}

function getLoggedTable(socketId, table) {
    let loggedTable

    table.forEach((item) => {
        if(item.id === socketId) {
            loggedTable = item
        }
    })

    return loggedTable
}

function getTask(interactions, user) {
    const task = interactions[Math.floor((Math.random() * interactions.length))]
    let sentence = ''
    let request = ''

    switch (task.type) {
        case 'bool':
            if (task.status && task.status === "off") {
                sentence = "Désactiver la " + task.data.title
                request = "off"
            } else {
                sentence = "Activer la " + task.data.title
                request = "on"
            }
            break
        case 'simple-list':
            const paramSimple = task.data.param
            sentence = "Enclencher le " + task.data.title + " " + paramSimple
            request = paramSimple
            break
        case 'complex-list':
            const param = task.data.param[Math.floor((Math.random() * task.data.param.length))]
            sentence = "Enclencher le " + task.data.title + " " + param
            request = param
            break
        case 'simple-cursor':
        case 'complex-cursor':
        case 'rotate':
            let step = task.data.param[Math.floor((Math.random() * task.data.param.length))]

            while (task.status === step) {
                step = task.data.param[Math.floor((Math.random() * task.data.param.length))]
            }

            sentence = "Mettre le " + task.data.title + " sur " + step
            request = step.toString()
            break
    }

    return new Task(user.id, task.data.title.replace(/\W/g,'_').toLowerCase(), task.type, task.status, sentence, request.replace(/\W/g,'_').toLowerCase())
}

module.exports = {
    getUser,
    getTheme,
    getUsersWithDashboard,
    getInteractions,
    getLoggedTable,
    getTask
}
