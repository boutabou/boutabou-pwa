
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
        if(this.socket) {
            this.socket.on('direction', this.direction)
        }
    }

    direction(url, datas) {
        
        this.swup.loadPage({
            url: url,
            method: 'POST'
        })
    }

    updateSocket(socket) {
        this.socket = socket
    }
}
