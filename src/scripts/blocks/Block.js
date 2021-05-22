export default class Block {
    constructor(el, socket, swup, os) {
        if(document.querySelector(el)) {
            this.socket = socket
            this.swup = swup
            this.os = os
            this.el = el.replace('.js-', '')

            if(this.socket) {
                this.socket.emit('load:' + this.el, this.socket.id)
            } else if (this.el !== 'login') {
                this.swup.loadPage({
                    url: '/views/pages/login.ejs',
                    method: 'GET'
                })

                return
            }

            this.vars()
            this.bindMethods()
            this.initEls()
            this.initEvents()

            document.addEventListener('swup:willReplaceContent', () => {
                this.destroy()
            })
        }
    }

    vars() {}

    bindMethods() {}

    initEls() {}

    initEvents() {}

    destroy() {}
}
