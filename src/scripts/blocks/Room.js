import Block from './Block'

export default class Room extends Block {
    initEls() {
        this.$els = {
            listUsers: document.querySelector('.js-list-users'),
            popup: document.querySelector('.js-popup'),
            popupTitle: document.querySelector('.js-popup-title'),
        }
    }

    bindMethods() {
        this.displayUsers = this.displayUsers.bind(this)
        this.waitRoom = this.waitRoom.bind(this)
        this.waitScan = this.waitScan.bind(this)
        this.endScan = this.endScan.bind(this)
    }

    initEvents() {
        this.socket.on('room:display-users', this.displayUsers)
        this.socket.on('room:popup-wait-room', this.waitRoom)
        this.socket.on('popup-wait-scan', this.waitScan)
        this.socket.on('remove-popup-wait-scan', this.endScan)
    }

    waitRoom() {
        this.socket.off()
        this.socket.disconnect()
        this.socket = null
        this.$els.popup.classList.add('active')
        this.$els.popupTitle.innerHTML = "Désolé, une partie est déjà en cours"
    }

    waitScan() {
        this.$els.popup.classList.add('active')
        this.$els.popupTitle.innerHTML = "Un joueur est en train de choisir le thème"
    }

    endScan() {
        this.$els.popup.classList.remove('active')
        this.$els.popupTitle.innerHTML = ""
    }

    displayUsers(users) {
        this.$els.listUsers.innerHTML = ""

        users.forEach(user => {
            const userCell = document.createElement('div')
            const userName = document.createElement('p')
            const avatar = document.createElement('img')

            userCell.setAttribute("id", "user-"+ user.id)
            userName.innerHTML = user.name
            avatar.src = user.avatar

            this.$els.listUsers.appendChild(userCell)
            userCell.appendChild(userName)
            userCell.appendChild(avatar)
        })
    }

    destroy() {
        this.socket.off('room:display-users', this.displayUsers)
        this.socket.off('room:popup-wait-room', this.waitRoom)
        this.socket.off('popup-wait-scan', this.waitScan)
        this.socket.off('remove-popup-wait-scan', this.endScan)
    }
}
