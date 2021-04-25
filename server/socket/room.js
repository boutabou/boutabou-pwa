let loggedUser = {
    name : '',
}

let users = []

let currentUserId = 0

const avatars = require('../data/avatars.json')


function initRoom(socket, io) {
    socket.on('user-login', name => { 
        const user = {}

        user.name    = name
        user.id      = currentUserId
        user.avatar  = avatars[Math.floor((Math.random() * avatars.length))].src

        users.push(user)
        loggedUser = user
        currentUserId ++ 
    })

    socket.on('room-load', () => {
        socket.emit('display-users', users)
        socket.broadcast.emit('display-users', [loggedUser])
        // Emission de 'user-login' et appel du callback
        io.emit('user-login', loggedUser)
    });
}

function getLoggedUser() {
    return loggedUser
}

module.exports = {
    initRoom,
    getLoggedUser
}
