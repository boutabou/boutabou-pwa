import Block from './Block'

export default class ScanQrCode extends Block {

    vars() {
        this.qrCodeSuccessCallback = message => {
            this.socket.emit('theme-choice', message)
        }
        this.config = { fps: 10, qrbox: 250 }
        this.html5QrCode = new Html5Qrcode("qr-reader")
    }

    initEvents() {
        this.startScan()
    }

    startScan() {
        this.html5QrCode.start({ facingMode: "environment" }, this.config, this.qrCodeSuccessCallback)
    }

    destroy() {
        if(this.html5QrCode) {
            this.html5QrCode.stop()
        }
    }
}
