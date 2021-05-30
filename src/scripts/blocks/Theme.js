import Block from './Block'

export default class Theme extends Block {
    initEls() {
        this.$els = {
            title: document.querySelector('.js-theme-title'),
            intro: document.querySelector('.js-theme-intro'),
            button: document.querySelector('.js-play-button')
        }
    }

    bindMethods() {
        this.displayTheme = this.displayTheme.bind(this)
        this.play = this.play.bind(this)
    }

    initEvents() {
        window.history.pushState({}, '')
        this.socket.on('theme:selected', this.displayTheme)
        this.$els.button.addEventListener('click', this.play)
    }

    displayTheme(message) {
        this.$els.title.innerHTML = message.title
        this.$els.intro.innerHTML = message.intro
    }

    play() {
        this.socket.emit('theme:play')
    }

    destroy() {
        this.socket.off('theme:selected', this.displayTheme)
        this.$els.button.removeEventListener('click', this.play)
    }
}
