const avatars = require('../data/avatars.json')

let currentUserId = 0

function initRoom(socket) {
    const promise  = new Promise((resolve, reject) => {
        socket.on('user-login', name => {
            const user = {}

            user.name    = name
            user.id      = currentUserId
            user.avatar  = avatars[Math.floor((Math.random() * avatars.length))].src

            currentUserId ++

            if (user) {
                resolve(user)
            } else {
                reject(user)
            }
        })
    })

    return promise
}

function roomLoad(socket, users, loggedUser) {
    socket.on('room-load', () => {
        socket.emit('display-users', users)
        socket.broadcast.emit('display-users', [loggedUser])
    })
}

function updateRoom(socket, loggedUser){
    socket.broadcast.emit('user-disconnection', loggedUser)
}

function getLoggedUser() {
    return loggedUser
}

module.exports = {
    initRoom,
    getLoggedUser,
    updateRoom,
    roomLoad
}
