import PwaPopUp from './scripts/utils/PwaPopUp'
import Swup from 'swup'
import BlockManager from './scripts/blocks/BlockManager'
import Direction from './scripts/utils/Direction'
import SplitContent from './scripts/utils/SplitContent'
import Blobs from './scripts/blobs/Blobs'

class App {
    constructor () {

        document.addEventListener('swup:contentReplaced', (event) => {
            this.init()

            if (this.socket && document.querySelector('.js-login')) {
                this.socket.off()
                this.socket.disconnect()
                this.socket = null
            }
        })

        document.addEventListener('swup:willReplaceContent', (event) => {
            if(!this.socket) {
                this.socket = this.blocks.getSocket()
                // this.socket.os = navigator.userAgent && /iPad|iPhone|iPod/.test(navigator.userAgent);
                this.direction.updateSocket(this.socket)
                this.direction.init()
            }
        })

        this.initApp()
        this.initServiceWorker()
    }

    initApp () {
        this.swup = new Swup()
        new SplitContent()
        new PwaPopUp()

        this.blocks = new BlockManager(this.socket, this.swup)
        this.direction = new Direction(this.socket, this.swup)
        new Blobs()
    }

    init() {
        this.blocks = new BlockManager(this.socket, this.swup)
        new SplitContent()
        new Blobs()
    }

    initServiceWorker () {
        if ("serviceWorker" in navigator && false) {
            navigator.serviceWorker.register("./serviceWorker.js")
        }
    }
}

new App()
