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
    }

    initEvents() {
        window.history.pushState({}, '')
        this.socket.on('theme:selected', this.displayTheme)
    }

    displayTheme(message) {
        this.$els.title.innerHTML = message.title
        this.$els.img.src = message.img
        this.$els.intro.innerHTML = message.intro


        let timeoutHandle = setTimeout( () => {
                let countdown = setInterval( () => {
                    if(this.counter > 0){
                        this.$els.countdown.innerHTML = this.counter
                        this.counter --
                    } else {
                        clearInterval(countdown)
                    }
                }, 1000 )
            
        }, 1500 )

    }

    destroy() {
        this.socket.removeListener('theme:selected')
    }
}
