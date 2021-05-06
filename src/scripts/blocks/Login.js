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
        this.checkKeyPressed = this.checkKeyPressed.bind(this)
    }

    initEvents() {
        this.$els.loginButton.addEventListener('click', this.createProfile)
        this.$els.username.addEventListener('keypress', this.checkKeyPressed)
    }

    checkKeyPressed(e){
        if((e.keyCode === 13 || e.key === 'Enter') && this.$els.username.value ){
            e.preventDefault()
            this.$els.loginButton.click()
        }
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
        this.$els.username.removeEventListener('keypress', this.checkKeyPressed)
    }
}
