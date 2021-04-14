import Socket from './scripts/Socket'
import PwaPopUp from './scripts/PwaPopUp'

class App {
    constructor () {
        this.initApp()
        this.initServiceWorker()
        console.log("hello")
    }

    initApp () {
        new Socket()
        new PwaPopUp()

        function onScanSuccess(qrMessage) {
            // handle the scanned code as you like
            console.log(`QR matched = ${qrMessage}`);
        }

        function onScanFailure(error) {
            // handle scan failure, usually better to ignore and keep scanning
            console.warn(`QR error = ${error}`);
        }

        let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader", { fps: 10, qrbox: 250 }, /* verbose= */ true);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }

    initServiceWorker () {
        if ("serviceWorker" in navigator && false) {
            navigator.serviceWorker.register("./serviceWorker.js")
        }
    }
}

new App()
