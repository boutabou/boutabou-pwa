export default class SocketReceive {
    constructor(socket) {
        this.socket = socket
        this.initEls()
        this.bindMethods()
        this.initEvents()
    }

    initEls() {
        this.$els = {
            messages: document.getElementById('messages'),
            form: document.getElementById('form'),
            input: document.getElementById('input'),
            loginButton: document.querySelector('.js-login-button'),
            login: document.querySelector('.js-login'),
            username: document.querySelector('.js-username'),
            home: document.querySelector('.js-home')
        };
        this.user = {
            name: ''
        }
    }

    bindMethods() {
        this.createMessage = this.createMessage.bind(this)
        this.addProfile = this.addProfile.bind(this)
        this.displayRoom = this.displayRoom.bind(this)
        this.displayRoomBis = this.displayRoomBis.bind(this)
    }

    initEvents() {
        // this.socket.on('user-login', this.addProfile)
        this.socket.on('chat-message', this.createMessage)
        this.socket.on('service-message', this.displayRoom)
        this.socket.on('service', this.displayRoomBis)
    }

    displayRoom(message) {
        console.log(message)
        const item = document.createElement('li')
        item.innerHTML = message.text
        if(document.querySelector('.js-list-users')) {
            document.querySelector('.js-list-users').appendChild(item)
        }
    }

    displayRoomBis(users) {
        console.log("User already logged in : ", users.text)
        users.text.forEach((user) => {
            const item = document.createElement('li')
            item.innerHTML = user.name + ' is already logged in'
            if(document.querySelector('.js-list-users')) {
                document.querySelector('.js-list-users').appendChild(item)
            }
        })
    }

    addProfile(loggedUser, users) {
        users.forEach((user) => {
            const item = document.createElement('li')
            item.innerHTML = '<span>' + user.name + '</span> is in the room !!!'
            if(document.querySelector('.js-list-users')) {
                document.querySelector('.js-list-users').appendChild(item)
            }
        })
        const item = document.createElement('li')
        item.innerHTML = '<span>' + loggedUser.name + '</span> join the room !!!'
        console.log(loggedUser)
        if(document.querySelector('.js-list-users')) {
            document.querySelector('.js-list-users').appendChild(item)
        }
        window.scrollTo(0, document.body.scrollHeight)
    }

    createMessage(msg, loggedUser) {
        {
            const item = document.createElement('li')
            item.innerHTML = '<b>' + loggedUser.name + '</b> : ' + msg
            this.$els.messages.appendChild(item)
            window.scrollTo(0, document.body.scrollHeight)
        }
    }
}
