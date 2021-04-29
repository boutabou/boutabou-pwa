const theme = require('../data/themes.json')

function getThemeSelected(socket) {
    const promise = new Promise((resolve, reject) => {
        socket.on('theme-choice', message => {
            if (theme[message]) {
                resolve(theme[message])
            } else {
                reject(theme[message])
            }
        })
    })
    return promise
}

module.exports = {
    getThemeSelected
}
