import Block from './Block'

export default class Theme extends Block {
    initEls() {
        this.$els = {
            title: document.querySelector('.js-theme-title'),
            img: document.querySelector('.js-theme-img'),
            intro: document.querySelector('.js-theme-intro'),
            countdown: document.querySelector('.js-theme-countdown'),
        }
        this.counter = 3
    }

    bindMethods() {
        this.displayTheme = this.displayTheme.bind(this)
        this.displayTimer = this.displayTimer.bind(this)
    }

    initEvents() {
        window.history.pushState({}, '')
        this.socket.on('theme:selected', this.displayTheme)
        this.socket.on('theme:on-timer', this.displayTimer)
    }

    displayTheme(message) {
        this.$els.title.innerHTML = message.title
        this.$els.img.src = message.img
        this.$els.intro.innerHTML = message.intro

    }

    displayTimer(cpt) {
        setTimeout( () => {
            this.$els.countdown.innerHTML = cpt
            cpt --
            setTimeout( () => {
                this.$els.countdown.innerHTML = cpt
                cpt --
            }, 1000)
            setTimeout( () => {
                this.$els.countdown.innerHTML = cpt
                cpt --
            }, 2000)
        }, 500 )
    }

    destroy() {
        this.socket.off('theme:selected', this.displayTheme)
        this.socket.off('theme:on-timer', this.displayTimer)
    }
}
