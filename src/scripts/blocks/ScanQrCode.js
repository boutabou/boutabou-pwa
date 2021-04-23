import Block from './Block'

export default class ScanQrCode extends Block {
    constructor(el) {
        super(el)

        if (el) {
            this.startScan()
        }
    }

    vars() {
        this.qrCodeSuccessCallback = message => { window.location = './theme.ejs?id=' + message }
        this.config = { fps: 10, qrbox: 250 }
        this.html5QrCode = new Html5Qrcode("qr-reader")
    }

    startScan() {
        this.html5QrCode.start({ facingMode: "environment" }, this.config, this.qrCodeSuccessCallback)
    }

    destroy() {
        this.html5QrCode.stop()
    }
}
