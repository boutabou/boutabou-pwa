const { createOwnRoom, updateRoomsOnCreateUser, updateRoomsOnDeleteUser } = require('./room')
const { createUser } = require('./userCreator')
const { getThemeSelected } = require('./theme')
const { initGameVars, initGame } = require('./game/gameManager')

function initSocket(io) {

    /**
     * Les utilisateurs connecté à la room
     */
    let users = []

    /**
     * Les utilisateurs connecté à la room
     */
    let currentTheme = {}

    io.on('connection', (socket) => {

        /**
         * Utilisateur connecté à la socket
         */
         let loggedUser = {}

        socket.on('disconnect', disconnection)
        socket.on('scan-load', () => { socket.broadcast.emit('direction',  '/views/pages/wait-scan.ejs') })
        socket.on('theme-load', () => { socket.emit('theme-selected', currentTheme) })
        socket.on('dashboard-load', () => { initGame(io, socket, loggedUser) })

        /**
         * Déconnecte loggedUser et l'enlever de la liste des utilisateurs
         */
        function disconnection() {
            users = users.filter((user) => { return user !== loggedUser})
            updateRoomsOnDeleteUser(socket, loggedUser)
        }

        /**
         * Création d'un utilisateur et ajout à la liste des utilisateurs
         */
        async function userCreated() {
            loggedUser = await createUser(socket)

            socket.on('room-load', () => { createOwnRoom(socket, users) })

            updateRoomsOnCreateUser(socket, loggedUser)
            users.push(loggedUser)
        }

        userCreated()

        /**
         * Récupère le théme un fois scanné
         */
        async function themeOnChoice() {
            currentTheme = await getThemeSelected(socket)
            io.emit('direction',  '/views/pages/theme.ejs')
            initGameVars(io, socket, currentTheme, users)
        }

        themeOnChoice()
    })
}

module.exports = {
    initSocket
}
