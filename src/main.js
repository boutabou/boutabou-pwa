import PwaPopUp from './scripts/utils/PwaPopUp'
import Swup from 'swup';
import BlockList from './scripts/blocks/BlockList'
import Direction from './scripts/utils/Direction'
import { io } from 'socket.io-client'

class App {
    constructor () {
        this.socket = io()
        document.addEventListener('swup:contentReplaced', (event) => {
            this.init()
        })
        this.initApp()
        this.initServiceWorker()
    }

    initApp () {
        this.swup = new Swup()
        new PwaPopUp()
        new BlockList(this.socket, this.swup)
        new Direction(this.socket, this.swup)
    }

    init() {
        new BlockList(this.socket, this.swup)
    }

    initServiceWorker () {
        if ("serviceWorker" in navigator && false) {
            navigator.serviceWorker.register("./serviceWorker.js")
        }
    }
}

new App()
