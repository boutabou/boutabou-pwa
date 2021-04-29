function createOwnRoom(socket, users) {
    socket.emit('display-users', users)
}

function updateRoomsOnCreateUser(socket, loggedUser){
    socket.broadcast.emit('display-users', [loggedUser])
}

function updateRoomsOnDeleteUser(socket, loggedUser){
    socket.broadcast.emit('user-disconnection', loggedUser)
}

module.exports = {
    createOwnRoom,
    updateRoomsOnCreateUser,
    updateRoomsOnDeleteUser
}
