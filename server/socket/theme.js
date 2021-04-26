const theme = require('../data/themes.json')
let themeSelected = null

function initTheme(socket) {
    const promise = new Promise((resolve, reject) => {
        socket.on('theme-choice', message => {
            themeSelected = theme[message]
            socket.emit('direction',  '/views/pages/theme.ejs')
            socket.broadcast.emit('direction',  '/views/pages/theme.ejs')

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
        socket.emit('theme-selected', themeSelected)
    })
}

module.exports = {
    initTheme,
    themeLoad
}
