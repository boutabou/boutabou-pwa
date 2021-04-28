const { initTheme, themeLoad } = require('./theme')
const { initRoom, updateRoom, roomLoad } = require('./room')
const { initScan } = require('./scan')
const { gameInit, gameTaskInit } = require('./game/gameManager')

function initSocket(io) {

    /**
     * Les utilisateurs connecté à la room
     */
    let users = []

    /**
     * Le théme séléctionné
     */
    let currentTheme = {}

    io.on('connection', (socket) => {

        /**
         * Utilisateur connecté à la socket
         */
         let loggedUser = {}

        socket.on('disconnect', () => {
            users = users.filter((user) => { return user !== loggedUser})
            updateRoom(socket, loggedUser)
        })

        initScan(socket)
        themeLoad(socket)

        async function userCreated() {
            loggedUser = await initRoom(socket)
            roomLoad(socket, users, loggedUser)
            users.push(loggedUser)
        }

        userCreated()

        async function themeOnChoice() {
            currentTheme = await initTheme(socket)
            gameInit(io, users, currentTheme)
        }

        // themeOnChoice()

        // redirect automatic on epilation theme
        socket.on('scan-load', () => {
            goToTheme()
        })

        socket.on('dashboard-load', () => {
            gameTaskInit(socket, loggedUser)
        })

        function goToTheme() {
            currentTheme = {
                "title" : "L'épilation",
                "img" : "../../assets/images/themes/epilation.jpg",
                "pathInteractions" : "data/interactions/depilation.json"
            }

            gameInit(io, users, currentTheme)
        }
    })
}

module.exports = {
    initSocket
}
