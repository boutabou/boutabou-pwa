export default class Direction {
    constructor(socket, swup) {
        this.socket = socket
        this.swup = swup

        this.bindMethods()
        this.init()
    }

    bindMethods() {
        this.direction = this.direction.bind(this)
    }

    init() {
        this.socket.on('direction', this.direction)
    }

    direction(url, data) {
        this.swup.loadPage({
            url: url,
            method: 'GET',
            data: data
        })
    }
}
