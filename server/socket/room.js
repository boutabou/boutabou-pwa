let avatars = []

function initRoom(socket) {
    const promise  = new Promise((resolve, reject) => {
        socket.on('user-login', name => {

            const user = {}

            user.name    = name
            user.id      = socket.id
            user.avatar  = feedAvatars()
            
            if (user) {
                resolve(user)
            } else {
                reject(user)
            }
        })
    })

    return promise
}

function feedAvatars(){

    if(avatars.length == 0){
        delete require.cache[require.resolve('../data/avatars.json')];
        avatars = require('../data/avatars.json')
    }

    const avatarUserKey = Math.floor((Math.random() * avatars.length)) 
    const userAvatar    = avatars[avatarUserKey].src
    avatars.splice(avatarUserKey, 1)

    return userAvatar
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
