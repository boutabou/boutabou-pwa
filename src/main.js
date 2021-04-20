import Socket from './scripts/Socket'
import PwaPopUp from './scripts/PwaPopUp'

class App {
    constructor () {
        this.initServiceWorker()
        this.initApp()
    }

    initApp () {
        new Socket()
        new PwaPopUp()
    }

    initServiceWorker () {

        if ("serviceWorker" in navigator) { 
            navigator.serviceWorker.register("./serviceWorker.js")
        }
    }
}

new App()
