let loggedUser = {
    name : ''
}

let users = []

function initRoom(socket, io) {
    socket.on('user-login', user => { loggedUser = user })

    socket.on('room-load', () => {

        // Envoi et sauvegarde des messages de service
        const userServiceMessage = {
            text: 'You logged in as "' + loggedUser.name + '"',
            type: 'login'
        };

        let listUsers = ''
        users.forEach((user) => {
            if(user) {
                listUsers.concat(', ', user.name)
            }
        })

        const userServiceMessageMemo = {
            text:  users,
            type: 'login'
        };

        const broadcastedServiceMessage = {
            text: 'User "' + loggedUser.name + '" logged in',
            type: 'login'
        };

        socket.emit('service', userServiceMessageMemo);
        users.push(loggedUser)
        socket.emit('service-message', userServiceMessage);
        socket.broadcast.emit('service-message', broadcastedServiceMessage);
        // Emission de 'user-login' et appel du callback
        io.emit('user-login', loggedUser);
    });
}

function getLoggedUser() {
    return loggedUser
}

module.exports = {
    initRoom,
    getLoggedUser
}
