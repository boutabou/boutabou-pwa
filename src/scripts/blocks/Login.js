import Block from './Block'
import { io } from 'socket.io-client'

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
            this.socketNew = io()
            this.user.name = this.$els.username.value
            this.socketNew.emit('user-login', this.user)
        }
    }

    getSocket() {
        return this.socketNew
    }

    destroy() {
        this.$els.loginButton.removeEventListener('click', this.createProfile)
    }
}
