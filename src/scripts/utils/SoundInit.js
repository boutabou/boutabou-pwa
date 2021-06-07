export default class SoundInit {
    constructor() {
        this.vars()
        this.initSounds()
    }

    vars() {
        this.sounds = {
            button: './../../../assets/sounds/button.wav',
            blob: './../../../assets/sounds/blob.mp3',
            timer: './../../../assets/sounds/timer.wav',
            dasboards: [
                './../../../assets/sounds/dashboard/4.mp3',
                './../../../assets/sounds/dashboard/5.mp3',
                './../../../assets/sounds/dashboard/6.mp3',
                './../../../assets/sounds/dashboard/7.mp3',
            ]
        }
    }

    initSounds() {
        this.buttonSound = document.createElement('audio')
        this.buttonSound.classList.add('sound-button')
        this.buttonSound.src = this.sounds.button
        this.buttonSound.setAttribute('preload', 'auto')
        this.buttonSound.setAttribute('controls', 'none')
        this.buttonSound.style.display = 'none'
        document.body.appendChild(this.buttonSound)

        this.blobSound = document.createElement('audio')
        this.blobSound.classList.add('sound-blob')
        this.blobSound.src = this.sounds.blob
        this.blobSound.setAttribute('preload', 'auto')
        this.blobSound.setAttribute('controls', 'none')
        this.blobSound.style.display = 'none'
        document.body.appendChild(this.blobSound)

        this.timerSound = document.createElement('audio')
        this.timerSound.classList.add('sound-timer')
        this.timerSound.src = this.sounds.timer
        this.timerSound.setAttribute('preload', 'auto')
        this.timerSound.setAttribute('controls', 'none')
        this.timerSound.style.display = 'none'
        document.body.appendChild(this.timerSound)

        this.sounds.dasboards.forEach((sound, index) => {
            const soundDashboard = document.createElement('audio')
            soundDashboard.classList.add('sound-dashboard')
            soundDashboard.src = this.sounds.dasboards[index]
            soundDashboard.setAttribute('preload', 'auto')
            soundDashboard.setAttribute('controls', 'none')
            soundDashboard.style.display = 'none'
            document.body.appendChild(soundDashboard)
        })
    }
}
