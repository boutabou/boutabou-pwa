// import jsQR from 'jsqr'

export default class Scan {
    constructor() {
        // this.initEls()
        // this.bindMethods()
        // this.initEvents()
        console.log('et tu la ?')
    }

    initEls() {
        this.$els = {
            canvasElement: document.getElementById("canvas"),
            loadingMessage: document.getElementById("loadingMessage"),
            outputContainer: document.getElementById("output"),
            outputMessage: document.getElementById("outputMessage"),
            outputData: document.getElementById("outputData")
        }

        this.video = document.createElement("video")
        this.canvas = this.$els.canvasElement.getContext("2d")
    }

    bindMethods() {
        this.tick = this.tick.bind(this)
    }

    initEvents() {
        // Use facingMode: environment to attemt to get the front camera on phones
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then((stream) => {
            this.video.srcObject = stream;
            this.video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            this.video.play();
            requestAnimationFrame(this.tick);
        });
    }

    drawLine(begin, end, color) {
        this.canvas.beginPath();
        this.canvas.moveTo(begin.x, begin.y);
        this.canvas.lineTo(end.x, end.y);
        this.canvas.lineWidth = 4;
        this.canvas.strokeStyle = color;
        this.canvas.stroke();
    }

    tick() {
        this.$els.loadingMessage.innerText = "⌛ Loading video...";
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.$els.loadingMessage.hidden = true;
            this.$els.canvasElement.hidden = false;
            this.$els.outputContainer.hidden = false;

            this.$els.canvasElement.height = this.video.videoHeight;
            this.$els.canvasElement.width = this.video.videoWidth;
            this.canvas.drawImage(this.video, 0, 0, this.$els.canvasElement.width, this.$els.canvasElement.height);
            const imageData = this.canvas.getImageData(0, 0, this.$els.canvasElement.width, this.$els.canvasElement.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });
            if (code) {
                this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
                this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
                this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
                this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
                this.$els.outputMessage.hidden = true;
                this.$els.outputData.parentElement.hidden = false;
                this.$els.outputData.innerText = code.data;
            } else {
                this.$els.outputMessage.hidden = false;
                this.$els.outputData.parentElement.hidden = true;
            }
        }
        requestAnimationFrame(this.tick);
    }
}
