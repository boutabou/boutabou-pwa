import Block from './Block'

export default class Room extends Block {
    initEls() {
        this.$els = {
            listUser: document.querySelector('.js-list-users'),
        }
    }

    bindMethods() {
        this.displayRoom = this.displayRoom.bind(this)
        this.displayRoomBis = this.displayRoomBis.bind(this)
    }

    initEvents() {
        this.socket.on('service-message', this.displayRoom)
        this.socket.on('service', this.displayRoomBis)
    }

    displayRoom(message) {
        const item = document.createElement('li')
        item.innerHTML = message.text
        this.$els.listUser.appendChild(item)
    }

    displayRoomBis(users) {
        users.text.forEach((user) => {
            const item = document.createElement('li')
            item.innerHTML = user.name + ' is already logged in'
            this.$els.listUser.appendChild(item)
        })
    }
}
