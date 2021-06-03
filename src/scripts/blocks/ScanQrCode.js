import Block from './Block'

export default class ScanQrCode extends Block {
    vars() {
        if(!this.os){
            this.qrCodeSuccessCallback = idTheme => {
                this.socket.emit('scan:theme-choice', idTheme)
                this.html5QrCode.clear()
            }
            this.config = { fps: 10, qrbox: 250 }
            if(typeof Html5Qrcode !== 'undefined') {
                this.html5QrCode = new Html5Qrcode('qr-reader')
            }
        }
    }

    initEls() {
        this.$els = {
            idButton: document.querySelector('.js-id-button'),
            id: document.querySelector('.js-id'),
            replacementContent: document.querySelector('.js-ios-content')
        }
        this.currentId
    }

    bindMethods() {
        this.getId = this.getId.bind(this)
        this.checkKeyPressed = this.checkKeyPressed.bind(this)
        this.displayReplacementContent = this.displayReplacementContent.bind(this)
    }

    initEvents() {
        if(!this.os){
            this.startScan()
        } else {
            this.displayReplacementContent()
        }

        this.$els.idButton.addEventListener('click', this.getId)
        this.$els.id.addEventListener('keypress', this.checkKeyPressed)
    }

    checkKeyPressed(e){
        if((e.keyCode === 13 || e.key === 'Enter') && this.$els.id.value){
            e.preventDefault()
            this.$els.idButton.click()
        }
    }

    getId() {
        if (this.$els.id.value && this.$els.id.value >= 0 && this.$els.id.value <= 2) {
            this.currentId = this.$els.id.value
            this.socket.emit('scan:theme-choice', this.currentId)
        } else {
            alert('Entrez un id correct')
        }
    }

    startScan() {
        if(this.html5QrCode) {
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
    }

    displayReplacementContent() {
        this.$els.replacementContent.innerHTML = "Le scan de QRCode n'est pas compatible avec votre appareil."
    }

    destroy(event) {
        if(this.html5QrCode) {
            this.html5QrCode.stop().then(ignore => {
                console.log('scan stop')
            }).catch(err => {
                console.log('scan stop faild ', err)
            })
        }

        this.$els.idButton.removeEventListener('click', this.getId)
        this.$els.id.removeEventListener('keypress', this.checkKeyPressed)
    }
}
