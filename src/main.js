import PwaPopUp from './scripts/utils/PwaPopUp'
import Swup from 'swup'
import BlockManager from './scripts/blocks/BlockManager'
import Direction from './scripts/utils/Direction'

class App {
    constructor () {
        this.socket = null
        document.addEventListener('swup:contentReplaced', (event) => {
            this.init()
        })

        document.addEventListener('swup:willReplaceContent', (event) => {
            if(!this.socket) {
                this.socket = this.blocks.getSocket()
                this.direction.updateSocket(this.socket)
                this.direction.init()
            }
        })

        this.initApp()
        this.initServiceWorker()
    }

    initApp () {
        this.swup = new Swup()
        new PwaPopUp()
        this.blocks = new BlockManager(this.socket, this.swup)
        this.direction = new Direction(this.socket, this.swup)
    }

    init() {
        this.blocks = new BlockManager(this.socket, this.swup)
    }

    initServiceWorker () {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("./serviceWorker.js")
        }
    }
}

new App()
