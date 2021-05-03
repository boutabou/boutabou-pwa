import Block from './Block'

export default class Room extends Block {
    initEls() {
        this.$els = {
            listUsers: document.querySelector('.js-list-users'),
        }
    }

    bindMethods() {
        this.displayUsers = this.displayUsers.bind(this)
    }

    initEvents() {
        this.socket.on('room:display-users', this.displayUsers)
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
        this.socket.removeListener('room:display-users')
    }
}
