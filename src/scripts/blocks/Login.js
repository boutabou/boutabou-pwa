import Block from './Block'

export default class Login extends Block {
    initEls() {
        this.$els = {
            loginButton: document.querySelector('.js-login-button'),
            username: document.querySelector('.js-username'),
        }
        this.user = {
            name: ''
        }
    }

    bindMethods() {
        this.createProfile = this.createProfile.bind(this)
    }

    initEvents() {
        this.$els.loginButton.addEventListener('click', this.createProfile)
    }

    createProfile() {
        if (this.$els.username.value) {
            this.user.name = this.$els.username.value

            setTimeout(() => this.socket.emit('user-login', this.user), 1000)
        }
    }

    destroy() {
        this.$els.loginButton.removeEventListener('click', this.createProfile)
    }
}
