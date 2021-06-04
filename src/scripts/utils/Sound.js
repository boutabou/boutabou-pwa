export default class Sound {
    constructor(socket) {
        this.vars(socket)
        this.initEls()
        this.bindMethods()
        this.initSounds()
        this.initEvents()

        if(this.socket) {
            this.socket.on('dashboard:display', this.addDashboardSound)
        }
    }

    vars(socket) {
        this.sounds = {
            button: './../../../assets/sounds/button.wav',
            dasboards: [
                './../../../assets/sounds/dashboard/4.mp3',
                './../../../assets/sounds/dashboard/5.mp3',
                './../../../assets/sounds/dashboard/6.mp3',
                './../../../assets/sounds/dashboard/7.mp3',
            ]
        }

        this.socket = socket
    }

    initEls() {
        this.$els = {
            buttons: document.querySelectorAll('.js-sound-button'),
            dashboardButtons: document.querySelectorAll('.js-sound-dashboard')
        }

        this.buttonSound = document.querySelector('.sound-button')
        this.dashboardSounds = document.querySelectorAll('.sound-dashboard')
    }

    bindMethods() {
        this.soundButtonPlay = this.soundButtonPlay.bind(this)
        this.soundDashboardPlay = this.soundDashboardPlay.bind(this)
        this.addDashboardSound = this.addDashboardSound.bind(this)
    }

    initSounds() {
        if(this.$els.buttons && !this.buttonSound) {
            this.buttonSound = document.createElement('audio')
            this.buttonSound.classList.add('sound-button')
            this.buttonSound.src = this.sounds.button
            this.buttonSound.setAttribute('preload', 'auto')
            this.buttonSound.setAttribute('controls', 'none')
            this.buttonSound.style.display = 'none'
            document.body.appendChild(this.buttonSound)
        }

        if(this.$els.dashboardButtons && this.dashboardSounds.length === 0) {
            this.sounds.dasboards.forEach((sound, index) => {
                const soundDashboard = document.createElement('audio')
                soundDashboard.classList.add('sound-dashboard')
                soundDashboard.src = this.sounds.dasboards[index]
                soundDashboard.setAttribute('preload', 'auto')
                soundDashboard.setAttribute('controls', 'none')
                soundDashboard.style.display = 'none'
                document.body.appendChild(soundDashboard)
                this.dashboardSounds = document.querySelectorAll('.sound-dashboard')
            })
        }
    }

    addDashboardSound() {
        setTimeout(() => {
            this.initEls()
            this.initSounds()
            this.initEvents()
        }, 500)
    }

    initEvents() {
        this.$els.buttons.forEach((button) => {
            button.addEventListener('mouseup', this.soundButtonPlay)
        })

        this.$els.dashboardButtons.forEach((button) => {
            button.addEventListener('mouseup', this.soundDashboardPlay)
            button.addEventListener('dragend', this.soundDashboardPlay)
        })
    }

    soundButtonPlay() {
        this.buttonSound.play()
    }

    soundDashboardPlay() {
        const sound = this.dashboardSounds[Math.floor(Math.random() * this.dashboardSounds.length )]
        sound.play()
    }

    destroy() {
        if(this.socket) {
            this.socket.off('dashboard:display', this.addDashboardSound)
        }

        this.$els.buttons.forEach((button) => {
            button.removeEventListener('mouseup', this.soundButtonPlay)
        })

        this.$els.dashboardButtons.forEach((button) => {
            button.removeEventListener('mouseup', this.soundDashboardPlay)
            button.removeEventListener('dragleave', this.soundDashboardPlay)
        })
    }
}
