import Block from './Block'

export default class Theme extends Block {
    initEls() {
        this.$els = {
            title: document.querySelector('.js-theme-title'),
            img: document.querySelector('.js-theme-img'),
        }
    }

    bindMethods() {
        this.displayTheme = this.displayTheme.bind(this)
    }

    initEvents() {
        this.socket.on('theme:selected', this.displayTheme)
    }

    displayTheme(message) {
        this.$els.title.innerHTML = 'Vous avez choisi le theme de ' + message.title
        this.$els.img.src = message.img
    }

    destroy() {
        this.socket.removeListener('theme:selected')
    }
}
