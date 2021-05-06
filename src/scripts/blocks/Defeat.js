import Block from './Block'

export default class Defeat extends Block {
    vars() {
        this.socket.off()
        this.socket.disconnect()
    }

    initEvents() {
        window.history.pushState({}, '')
    }
}
