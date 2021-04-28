import Block from './Block'

export default class ScanQrCode extends Block {

    vars() {
        this.qrCodeSuccessCallback = idTheme => {
            this.socket.emit('theme-choice', idTheme)
            this.html5QrCode.clear()
        }
        this.config = { fps: 10, qrbox: 250 }
        this.html5QrCode = new Html5Qrcode("qr-reader")
    }

    initEvents() {
        this.startScan()
    }

    startScan() {
        this.html5QrCode.start(
            { facingMode: "environment" },
            this.config,
            this.qrCodeSuccessCallback,
            errorMessage => {
                console.log('error from scan ', errorMessage)
            })
            .catch(err => {
                console.log('error from scan start : ', err)
            }
        )
    }

    destroy() {
        if(this.html5QrCode) {
            this.html5QrCode.stop().then(ignore => {
                console.log('scan stop')
            }).catch(err => {
                console.log('scan stop faild ', err)
            })
        }
    }
}
