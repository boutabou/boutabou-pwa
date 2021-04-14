import { io } from 'socket.io-client'

export default class Socket {
    constructor() {
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
        this.socket = io()
        this.user = {
            name: ''
        }
    }

    bindMethods() {
        this.createProfile = this.createProfile.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.createMessage = this.createMessage.bind(this)
        this.addProfile = this.addProfile.bind(this)
    }

    initEvents() {
        if(this.$els.loginButton) {
            this.$els.loginButton.addEventListener('click', this.createProfile);
            this.$els.form.addEventListener('submit', this.sendMessage);
            this.socket.on('user-login', this.addProfile);
            this.socket.on('chat-message', this.createMessage);
        }
    }

    createProfile() {
        if (this.$els.username.value) {
            this.user.name = this.$els.username.value

            this.socket.emit('user-login', this.user)
            this.$els.login.classList.add('login--disable')
            this.$els.home.classList.remove('home--disable')
            this.$els.input.focus()
        }
    }

    addProfile(loggedUser) {
        const item = document.createElement('li')
        item.innerHTML = '<span>' + loggedUser.name + '</span> join the room !!!'
        this.$els.messages.appendChild(item)
        window.scrollTo(0, document.body.scrollHeight)
    }

    sendMessage(e) {
        e.preventDefault()
        if (this.$els.input.value) {
            this.socket.emit('chat-message', this.$els.input.value)
            this.$els.input.value = ''
        }
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
