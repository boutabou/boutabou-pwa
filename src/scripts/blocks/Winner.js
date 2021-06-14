import Block from './Block'

export default class Winner extends Block {
    initEls() {
        this.$els = {
            avatar: document.querySelector('.js-winner-avatar'),
            winner: document.querySelector('.js-theme-winner'),
            challenge: document.querySelector('.js-theme-challenge'),
            popup: document.querySelector('.js-popup'),
            popupTitle: document.querySelector('.js-popup-title'),
        }
    }

    bindMethods() {
        this.displayWinner = this.displayWinner.bind(this)
        this.waitScan = this.waitScan.bind(this)
        this.endScan = this.endScan.bind(this)
    }

    initEvents() {
        this.socket.on('winner:display-winner', this.displayWinner)
        this.socket.on('popup-wait-scan', this.waitScan)
        this.socket.on('remove-popup-wait-scan', this.endScan)
    }

    displayWinner(message, winner) {
        this.$els.avatar.setAttribute("src", winner.avatar )
        this.$els.winner.innerHTML = message.winner.replace('{winner}', winner.name)
        this.$els.challenge.innerHTML = message.challenge
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
        this.socket.off('winner:display-winner', this.displayWinner)
        this.socket.off('popup-wait-scan', this.waitScan)
        this.socket.off('remove-popup-wait-scan', this.endScan)
    }
}
