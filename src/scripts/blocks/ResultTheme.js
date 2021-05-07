import Block from './Block'

export default class ResultTheme extends Block {
    initEls() {
        this.$els = {
            title: document.querySelector('.js-theme-title'),
            winner: document.querySelector('.js-theme-winner'),
            img: document.querySelector('.js-theme-img'),
            scanButton : document.querySelector('.js-scan-button'),
            popup: document.querySelector('.js-popup'),
            popupTitle: document.querySelector('.js-popup-title'),
        }
    }

    bindMethods() {
        this.displayTheme = this.displayTheme.bind(this)
        this.waitScan = this.waitScan.bind(this)
        this.endScan = this.endScan.bind(this)
        this.clickScan = this.clickScan.bind(this)
    }

    initEvents() {
        window.history.pushState({}, '')
        this.socket.on('result-theme:win', this.displayTheme)
        this.socket.on('popup-wait-scan', this.waitScan)
        this.socket.on('remove-popup-wait-scan', this.endScan)
        this.$els.scanButton.addEventListener('click', this.clickScan)
    }

    displayTheme(message, winner) {
        this.$els.title.innerHTML = 'Vous avez reussi le theme de ' + message.title
        this.$els.winner.innerHTML = winner.name + ' à été un expert sur ce thème'
        this.$els.img.src = message.img
    }

    clickScan() {
        this.socket.emit('result-theme:scan-button-clicked', this.socket.id)
    }

    waitScan() {
        this.$els.popup.classList.add('active')
        this.$els.popupTitle.innerHTML = "Un joueur est en train de choisir le prochain théme"
    }

    endScan() {
        this.$els.popup.classList.remove('active')
        this.$els.popupTitle.innerHTML = ""
    }

    destroy() {
        this.socket.removeListener('result-theme:win')
        this.socket.off('popup-wait-scan', this.waitScan)
        this.socket.off('remove-popup-wait-scan', this.endScan)
        this.$els.scanButton.removeEventListener('click', this.clickScan)
    }
}
