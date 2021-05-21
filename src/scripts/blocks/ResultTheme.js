import Block from './Block'

export default class ResultTheme extends Block {
    initEls() {
        this.$els = {
            title: document.querySelector('.js-theme-title'),
            text: document.querySelector('.js-theme-text'),
            winner: document.querySelector('.js-theme-winner'),
            img: document.querySelector('.js-theme-img'),
            winnerButton : document.querySelector('.js-to-winner-button'),
            popup: document.querySelector('.js-popup'),
            popupTitle: document.querySelector('.js-popup-title'),
        }
    }

    bindMethods() {
        this.displayTheme = this.displayTheme.bind(this)
    } 

    initEvents() {
        window.history.pushState({}, '')
        this.socket.on('result-theme:win', this.displayTheme)
    }

    displayTheme(message) {
        this.$els.title.innerHTML = message.title
        this.$els.text.innerHTML = message.end
        this.$els.img.src = message.img
    }


    destroy() {
        this.socket.removeListener('result-theme:win')
    }
}
