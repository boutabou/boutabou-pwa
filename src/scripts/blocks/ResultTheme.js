import Block from './Block'

export default class ResultTheme extends Block {
    initEls() {
        this.$els = {
            popup: document.querySelector('.js-popup'),
            popupTitle: document.querySelector('.js-popup-title'),
        }
    }

    bindMethods() {
        this.waitScan = this.waitScan.bind(this)
        this.endScan = this.endScan.bind(this)
    }

    initEvents() {
        window.history.pushState({}, '')
        this.socket.on('popup-wait-scan', this.waitScan)
        this.socket.on('remove-popup-wait-scan', this.endScan)
    }

    waitScan() {
        this.$els.popup.classList.add('active')
        this.$els.popupTitle.innerHTML = "Un joueur est en train de choisir le prochain thème"
    }

    endScan() {
        this.$els.popup.classList.remove('active')
        this.$els.popupTitle.innerHTML = ""
    }

    destroy() {
        this.socket.off('popup-wait-scan', this.waitScan)
        this.socket.off('remove-popup-wait-scan', this.endScan)
    }
}
