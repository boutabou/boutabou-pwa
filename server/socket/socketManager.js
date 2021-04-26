const { initTheme, getThemeSelected } = require('./theme')
const { initRoom, getLoggedUser, updateRoom } = require('./room')
const { initScan } = require('./scan')

function initSocket(io) {
    io.on('connection', (socket) => {


        /**
         * Les utilisateurs connecté à la room
         */
         let users = []

        /**
         * Utilisateur connecté à la socket
         */

         let loggedUser

        /* TO DO : Trouver une solution plus propre pour que la fonction s'execute avant la suite : promesse.. */ 
        setTimeout(() => {
            loggedUser = getLoggedUser() 
        }, 100);


        /**
         * Le théme séléctionné
         */
        let themeSelected = {}

        socket.on('disconnect', () => {
            updateRoom(socket, io)            
        })

        initRoom(socket, io)
        initScan(socket)
        initTheme(socket)

    })
}

module.exports = {
    initSocket
}
