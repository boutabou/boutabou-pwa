const theme = require('../data/theme.json')
let themeSelected = {}

function initTheme(socket) {
    socket.on('theme-choice', message => {
        themeSelected = theme[message]
        socket.emit('direction',  '/views/pages/theme.ejs')
        socket.broadcast.emit('direction',  '/views/pages/theme.ejs')
    })

    socket.on('theme-load', () => {
        socket.emit('theme-selected', themeSelected)
    })
}

function getThemeSelected() {
    return themeSelected
}

module.exports = {
    initTheme,
    getThemeSelected
}
