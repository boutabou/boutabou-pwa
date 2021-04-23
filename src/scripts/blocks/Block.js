export default class Block {
    constructor(el, socket, swup) {
        if(el) {
            this.socket = socket
            this.swup = swup

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
