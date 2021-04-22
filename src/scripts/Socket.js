export default class Socket {
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
        this.createProfile = this.createProfile.bind(this)
    }

    initEvents() {
        if (this.$els.loginButton) {
            this.$els.loginButton.addEventListener('click', this.createProfile);
        }

        // this.socket.on('user-login', this.addProfile);
        // this.socket.on('chat-message', this.createMessage);
    }

    createProfile() {
        if (this.$els.username.value) {
            this.user.name = this.$els.username.value

            setTimeout(() => this.socket.emit('user-login', this.user), 1000)

            // window.location = './room.ejs?id=' + this.user.name
            // this.$els.login.classList.add('login--disable')
            // this.$els.home.classList.remove('home--disable')
            // this.$els.input.focus()
        }
    }
}
