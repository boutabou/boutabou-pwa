const { initTheme, getThemeSelected } = require('./theme')
const { initRoom, getLoggedUser } = require('./room')
const { initScan } = require('./scan')

function initSocket(io) {
    io.on('connection', (socket) => {

        /**
         * Utilisateur connecté à la socket
         */
        let loggedUser = {
            name : ''
        }

        /**
         * Les utilisateurs connecté à la room
         */
        let users = []

        /**
         * Le théme séléctionné
         */
        let themeSelected = {}

        socket.on('disconnect', () => {
            loggedUser = getLoggedUser()
            if (loggedUser.name !== '') {
                var serviceMessage = {
                    text: 'User "' + loggedUser.name + '" disconnected',
                    type: 'logout'
                }
                socket.broadcast.emit('service-message', serviceMessage)

                // Suppression de la liste des connectés
                const userIndex = users.indexOf(loggedUser)

                if (userIndex !== -1) {
                    users.splice(userIndex, 1)
                }
                // Emission d'un 'user-logout' contenant le user
                io.emit('user-logout', loggedUser)
            }
        })

        initRoom(socket, io)
        initScan(socket)
        initTheme(socket)

    })
}

module.exports = {
    initSocket
}
