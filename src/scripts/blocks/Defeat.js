import Block from './Block'

export default class Defeat extends Block {
    initEvents() {
        window.history.pushState({}, '')

        setTimeout(() => {
            this.socket.off()
            this.socket.disconnect()
        }, 100)
    }
}
