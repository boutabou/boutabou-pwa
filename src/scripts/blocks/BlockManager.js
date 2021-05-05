import Login from './Login'
import ScanQrCode from './ScanQrCode'
import Room from './Room'
import Theme from './Theme'
import Dashboard from './Dashboard'
import ResultTheme from './ResultTheme'

export default class BlockManager {
    constructor(socket, swup) {

        this.login = new Login('.js-login', socket, swup)
        new ScanQrCode('.js-scan', socket, swup)
        new Room('.js-room', socket, swup)
        new Theme('.js-theme', socket, swup)
        new Dashboard('.js-dashboard', socket, swup)
        new ResultTheme('.js-result-theme', socket, swup)

        this.socket = socket

        this.bindMethods()
        this.initEls()
        this.initEvents()

        document.addEventListener('swup:contentReplaced', () => {
            this.destroy()
        })
    }

    bindMethods() {
        this.initSocket = this.initSocket.bind(this)
    }

    initEls() {
        this.loginButton = document.querySelector('.js-login-button')
    }

    initEvents() {
        if(this.loginButton) {
            this.loginButton.addEventListener('click', this.initSocket)
        }
    }

    initSocket() {
        if(!this.socket) {
            this.socket = this.login.getSocket()
        }
    }

    getSocket() {
        return this.socket
    }

    destroy() {
        if(this.loginButton) {
            this.loginButton.removeEventListener('click', this.initSocket)
        }
    }
}
