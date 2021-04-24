export default class Block {
    constructor(el, socket, swup) {
        if(document.querySelector(el)) {
            this.socket = socket
            this.swup = swup
            this.el = el.replace('.js-', '')

            if(this.socket) {
                this.socket.emit(this.el + '-load')
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

            document.addEventListener('swup:contentReplaced', () => {
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
