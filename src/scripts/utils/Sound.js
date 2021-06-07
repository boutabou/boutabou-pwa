export default class Sound {
    constructor() {
        this.initEls()
        this.bindMethods()
        this.initEvents()
    }

    initEls() {
        this.$els = {
            buttons: document.querySelectorAll('.js-sound-button')
        }

        this.buttonSound = document.querySelector('.sound-button')
    }

    bindMethods() {
        this.soundButtonPlay = this.soundButtonPlay.bind(this)
    }

    initEvents() {
        this.$els.buttons.forEach((button) => {
            button.addEventListener('mouseup', this.soundButtonPlay)
        })
    }

    soundButtonPlay() {
        this.buttonSound.play()
    }

    destroy() {
        this.$els.buttons.forEach((button) => {
            button.removeEventListener('mouseup', this.soundButtonPlay)
        })
    }
}
