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

    direction(url) {
        const block = url.replace('/views/pages/', '').replace('.ejs', '')
        const blockEls = document.querySelector(`.js-${block}`)

        if(!blockEls) {
            this.swup.loadPage({
                url: url,
                method: 'GET'
            })
        }
    }

    updateSocket(socket) {
        this.socket = socket
    }
}
