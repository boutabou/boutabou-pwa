import Socket from './scripts/Socket'
import PwaPopUp from './scripts/PwaPopUp'
import Swup from 'swup';
import SocketReceive from './scripts/SocketReceive'
import { io } from 'socket.io-client'

class App {
    constructor () {
        this.socket = io()
        document.addEventListener('swup:contentReplaced', (event) => {
            // do something when content is replaced
            this.init()
        });
        this.initApp()
        this.initServiceWorker()
    }

    initApp () {
        new Swup()
        new Socket(this.socket)
        new SocketReceive(this.socket)
        new PwaPopUp()
        console.log('from init app')
    }

    initServiceWorker () {

        if ("serviceWorker" in navigator && false) {
            navigator.serviceWorker.register("./serviceWorker.js")
        }
    }

    init() {
        console.log('from init')
        new Socket(this.socket)
    }
}

new App()
