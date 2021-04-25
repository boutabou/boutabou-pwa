import Block from './Block'

export default class Room extends Block {
    initEls() {
        this.$els = {
            listUser: document.querySelector('.js-list-users'),
        }
    }

    bindMethods() {
        this.displayRoom = this.displayRoom.bind(this)
    }

    initEvents() {
        this.socket.on('display-users', this.displayRoom) 
    }

    displayRoom(users) {

        users.forEach(user => {
            const userCell = document.createElement('div')
            const userName = document.createElement('p')
            const avatar = document.createElement('img')

            userCell.classList.add("user-"+ user.id)  
            userName.innerHTML = user.name
            avatar.src = user.avatar
    
            this.$els.listUser.appendChild(userCell)
            userCell.appendChild(userName)
            userCell.appendChild(avatar)
        })
    }
}
