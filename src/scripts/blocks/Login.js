import Block from './Block'
import { io } from 'socket.io-client'

export default class Login extends Block {
    initEls() {
        this.$els = {
            loginButton: document.querySelector('.js-login-button'),
            username: document.querySelector('.js-username'),
            avatar: document.querySelector('.js-avatar'),
        }

        this.currentName = ''
        this.$els.loginButton.classList.add('inactive')
    }

    bindMethods() {
        this.createProfile = this.createProfile.bind(this)
        this.checkKeyPressed = this.checkKeyPressed.bind(this)
        this.enableButtonLogin = this.enableButtonLogin.bind(this)
    }

    initEvents() {
        this.$els.loginButton.addEventListener('click', this.createProfile)
        this.$els.username.addEventListener('keypress', this.checkKeyPressed)
        this.$els.username.addEventListener('keydown', this.enableButtonLogin)
    }

    checkKeyPressed(e){
        if((e.keyCode === 13 || e.key === 'Enter') && this.$els.username.value ){
            e.preventDefault()
            this.$els.loginButton.click()
        }

        this.enableButtonLogin()
    }

    enableButtonLogin() {
        setTimeout(() => {
            if(this.$els.username.value == '') {
                this.$els.loginButton.classList.add('inactive')
            } else {
                this.$els.loginButton.classList.remove('inactive')
            }
        }, 10)
    }

    createProfile() {
        if (this.$els.username.value) {
            this.socketNew = io()
            this.currentName = this.$els.username.value
            this.socketNew.emit('room:user-login', this.currentName, this.$els.avatar.dataset.avatarIndex)
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
