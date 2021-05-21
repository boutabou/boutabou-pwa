import Block from './Block'

export default class Winner extends Block {
    initEls() {
        this.$els = {
            title: document.querySelector('.js-theme-title'),
            avatar: document.querySelector('.js-winner-avatar'),
            winner: document.querySelector('.js-theme-winner'),
            challenge: document.querySelector('.js-theme-challenge'),
            scanButton : document.querySelector('.js-scan-button'),
        }
    }

    bindMethods() {
        this.displayWinner = this.displayWinner.bind(this)
        this.waitScan = this.waitScan.bind(this)
        this.endScan = this.endScan.bind(this)
        this.clickScan = this.clickScan.bind(this)
    }

    initEvents() {
        this.socket.on("winner:display-winner", this.displayWinner)
        this.socket.on('popup-wait-scan', this.waitScan)
        this.socket.on('remove-popup-wait-scan', this.endScan)
        this.$els.scanButton.addEventListener('click', this.clickScan)
    }

    displayWinner(message, winner) {
        console.log(winner)
        this.$els.title.innerHTML = message.title
        this.$els.avatar.setAttribute("src", winner.avatar )
        this.$els.winner.innerHTML = message.winner.replace('{winner}', winner.name)
        this.$els.challenge.innerHTML = message.challenge
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
        this.socket.removeListener('winner:display-winner')
        this.socket.off('popup-wait-scan', this.waitScan)
        this.socket.off('remove-popup-wait-scan', this.endScan)
        this.$els.scanButton.removeEventListener('click', this.clickScan)
    }
}
