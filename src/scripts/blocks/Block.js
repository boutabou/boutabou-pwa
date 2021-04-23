export default class Block {
    constructor(el, socket) {
        if(el) {
            this.socket = socket

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
