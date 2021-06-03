import Block from './Block'

export default class Theme extends Block {
    initEls() {
        this.$els = {
            playButton: document.querySelector('.js-play-button')
        }
    }

    bindMethods() {
        this.startGame = this.startGame.bind(this)
    }

    initEvents() {
        window.history.pushState({}, '')
        this.$els.playButton.addEventListener('click', this.startGame)
    }

    startGame() {
        this.socket.emit('theme:start', this.socket.id)
    }

    destroy() {
        this.$els.playButton.removeEventListener('click', this.startGame)
    }
}
