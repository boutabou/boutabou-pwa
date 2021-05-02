const theme = require('../data/themes.json')
let xhr = require("xhr")


let themeSelected = null

function initTheme(socket, io) {
    const promise = new Promise((resolve, reject) => {
        socket.on('theme-choice', message => {
            themeSelected = theme[message]

            socket.emit('direction',  '/views/pages/theme.ejs?theme=0')
            io.emit('direction',  '/views/pages/theme.ejs?theme=0')

            if (themeSelected) {
                resolve(themeSelected)
            } else {
                reject(themeSelected)
            }
        })
    })

    return promise
}



function themeLoad(socket) {
    socket.on('theme-load', () => {
        //socket.emit('theme-selected', themeSelected)
    })
}

module.exports = {
    initTheme,
    themeLoad
}
