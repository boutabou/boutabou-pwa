import Block from './Block'

export default class ResultTheme extends Block {
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
        this.socket.on('result-theme:win', this.displayTheme)
    }

    displayTheme(message) {
        this.$els.title.innerHTML = 'Vous avez reussi le theme de ' + message.title
        this.$els.img.src = message.img
    }

    destroy() {
        this.socket.removeListener('result-theme:win')
    }
}
