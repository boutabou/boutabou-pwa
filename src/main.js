import PwaPopUp from './scripts/utils/PwaPopUp'
import Swup from 'swup';
import BlockList from './scripts/blocks/BlockList'
import { io } from 'socket.io-client'

class App {
    constructor () {
        this.socket = io()
        document.addEventListener('swup:contentReplaced', (event) => {
            this.init()
        });
        this.initApp()
        this.initServiceWorker()
    }

    initApp () {
        new Swup()
        new PwaPopUp()
        new BlockList(this.socket)
    }

    initServiceWorker () {
        if ("serviceWorker" in navigator && false) {
            navigator.serviceWorker.register("./serviceWorker.js")
        }
    }

    init() {
        new BlockList(this.socket)
    }
}

new App()
