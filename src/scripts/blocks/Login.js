import Block from './Block'
import { io } from 'socket.io-client'

export default class Login extends Block {
    initEls() {
        this.$els = {
            loginButton: document.querySelector('.js-login-button'),
            username: document.querySelector('.js-username'),
        }
        this.currentName = ''
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
            this.currentName = this.$els.username.value
            this.socketNew.emit('room:user-login', this.currentName)
        }
    }

    getSocket() {
        return this.socketNew
    }

    destroy() {
        this.$els.loginButton.removeEventListener('click', this.createProfile)
    }
}
