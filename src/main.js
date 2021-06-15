import PwaPopUp from './scripts/utils/PwaPopUp'
import Swup from 'swup'
import BlockManager from './scripts/blocks/BlockManager'
import Direction from './scripts/utils/Direction'
import SplitContent from './scripts/utils/SplitContent'
import Blobs from './scripts/blobs/Blobs'
import SoundInit from './scripts/utils/SoundInit'
import Sound from './scripts/utils/Sound'

class App {
    constructor () {
        this.os = navigator.userAgent && /iPad|iPhone|iPod/.test(navigator.userAgent)
        this.responsive = document.querySelector('.responsive')

        document.addEventListener('swup:contentReplaced', (event) => {
            this.init()

            if (this.socket && document.querySelector('.js-login')) {
                this.socket.off()
                this.socket.disconnect()
                this.socket = null
            }

            if(this.swup) {
                this.swup.cache.empty();
            }
        })

        document.addEventListener('swup:willReplaceContent', (event) => {
            if(!this.socket) {
                this.socket = this.blocks.getSocket()
                this.direction.updateSocket(this.socket)
                this.direction.init()
            }

            if(this.swup) {
                this.swup.cache.empty()
            }

            this.sound.destroy()
        })

        this.initApp()
        this.initServiceWorker()
    }

    initApp () {
        this.swup = new Swup()

        this.height = window.innerHeight + "px"

        document.querySelector('#swup').style.height = this.height

        this.orientationLandscape = false

        window.addEventListener('orientationchange', () => {
            if(event.target.screen.orientation.angle !== 0) {
              this.orientationLandscape = true 
            } else {
              this.orientationLandscape = false
            }
            console.log("update", this.orientationLandscape)
        })

        window.addEventListener('resize', () => {
            if(!this.orientationLandscape) {
                document.querySelector('#swup').style.height = window.innerHeight + "px"
            }

            if(window.innerWidth > 500) {
                this.responsive.classList.add('responsive--active')
            } else {
                this.responsive.classList.remove('responsive--active')
            }
        })

       

        new SplitContent()
        new PwaPopUp()
        new Blobs()
        new SoundInit()
        this.sound = new Sound(this.socket)

        this.blocks = new BlockManager(this.socket, this.swup, this.os)
        this.direction = new Direction(this.socket, this.swup)
    }

    init() {
        document.querySelector('#swup').style.height = this.height

        this.blocks = new BlockManager(this.socket, this.swup, this.os)
        new SplitContent()
        new Blobs()
        this.sound = new Sound(this.socket)
    }

    initServiceWorker () {
        if ("serviceWorker" in navigator && false) {
            navigator.serviceWorker.register("./serviceWorker.js")
        }
    }
}

new App()
