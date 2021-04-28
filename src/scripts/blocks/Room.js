import Block from './Block'

export default class Room extends Block {
    initEls() {
        this.$els = {
            listUser: document.querySelector('.js-list-users'),
        }
    }

    bindMethods() {
        this.displayRoom = this.displayRoom.bind(this)
        this.deleteUser  = this.deleteUser.bind(this)
    }

    initEvents() {
        this.socket.on('display-users', this.displayRoom)
        this.socket.on('user-disconnection', this.deleteUser)
    }

    displayRoom(users) {

        users.forEach(user => {
            const userCell = document.createElement('div')
            const userName = document.createElement('p')
            const avatar = document.createElement('img')

            userCell.setAttribute("id", "user-"+ user.id)
            userName.innerHTML = user.name
            avatar.src = user.avatar

            this.$els.listUser.appendChild(userCell)
            userCell.appendChild(userName)
            userCell.appendChild(avatar)
        })
    }

    deleteUser(datas){
        const userCell = document.getElementById("user-"+ datas.id)
        userCell.parentNode.removeChild(userCell);
    }

    destroy() {
        this.socket.removeListener('display-users')
        this.socket.removeListener('user-disconnection')
    }
}
