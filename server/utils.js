const { User } = require('./User')
const { Interactions } = require('./Interactions')
const theme = require('./data/themes.json')
const avatars = require('./data/avatars.json')

/**
 * @param socket Socket
 * return Promise(User)
 */
function getUser(socket) {
    const promise  = new Promise((resolve, reject) => {
        socket.on('room:user-login', (name, avatar) => {
            //const lessUsedAvatars = getLessUsed(avatars)
            //const randomAvatar = lessUsedAvatars[getRandomIndex(lessUsedAvatars)]
            const user = new User(name, socket.id, avatar)

            //randomAvatar.nbUsed ++

            if (user) {
                resolve(user)
            } else {
                reject(user)
            }
        })
    })

    return promise
}

/**
 * @param socket Socket
 * return Promise(theme)
 */
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
            interaction.nbUsed = 0
        })
    })

    users.forEach((user) => {
        delete require.cache[require.resolve('./data/tables.json')]
        const dashboard = require('./data/tables.json')

        user.dashboard = dashboard[getRandomIndex(dashboard)]

        user.dashboard.forEach((interactionBoard) => {
            const dataByType = getLessUsed(interactions[interactionBoard.type])
            const random = getRandomIndex(dataByType)

            interactionBoard.data = dataByType[random]
            dataByType[random].nbUsed ++
        })
    })

    return users
}

/**
 * Return item of tad with the same id of socketId
 * @param users Array(User), sockets Array(Socket)
 * return Array(Interaction)
 */
function getInteractions(users, sockets) {
    const interactions = new Interactions(sockets)

    users.forEach((user) => {
        user.dashboard.forEach((interaction) => {
            interactions.addNew(interaction)
        })
    })

    return interactions
}

/**
 * Return item of tad with the same id of socketId
 * @param socketId ID, tab Array
 * return item
 */
function getLoggedTable(socketId, tab) {
    let loggedTable

    tab.forEach((item) => {
        if(item.id === socketId) {
            loggedTable = item
        }
    })

    return loggedTable
}

/**
 * Return tab with item less use
 * @param tab Array
 * return Array
 */
function getLessUsed(tab) {
    let limit = 1
    const nbUsedItems = []
    const tabLessUsed = []

    tab.forEach((item) => {
        nbUsedItems.push(item.nbUsed || 0)
    })

    limit = Math.min(...nbUsedItems) + 1

    tab.forEach((item) => {
        if(item.nbUsed < limit) {
            tabLessUsed.push(item)
        }
    })

    return tabLessUsed
}

/**
 * Return random index of an array
 * @param tab Array
 * return Int
 */
function getRandomIndex(tab) {
    return Math.floor((Math.random() * tab.length))
}

/**
 * Return random item of an array
 * @param tab Array
 * return Array
 */
function getRandom(tab) {
    return tab[Math.floor((Math.random() * tab.length))]
}

module.exports = {
    getUser,
    getTheme,
    getUsersWithDashboard,
    getInteractions,
    getLoggedTable,
    getRandomIndex,
    getRandom
}
