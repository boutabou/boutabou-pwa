function initScan(socket) {
    socket.on('scan-load', () => {
        socket.broadcast.emit('direction',  '/views/pages/wait-scan.ejs')
    })
}

module.exports = {
    initScan
}
