const { initTheme, themeLoad } = require('./theme')
const { initRoom, updateRoom, roomLoad } = require('./room')
const { initScan } = require('./scan')
const { dashboardLoad, initDashboard } = require('./dashboard')

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

            users.forEach(user => {
                if(user.id == loggedUser.id){
                    users.pop(user)
                }
            })

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

            users = initDashboard(users, currentTheme)

            setTimeout(() => { io.emit('direction',  '/views/pages/game.ejs') }, 1000)
        }

        socket.on('dashboard-load', () => {
            dashboardLoad(socket, loggedUser)
        })

        themeOnChoice()
    })
}

module.exports = {
    initSocket
}
