import Interaction from './Interaction'

export default class Bool extends Interaction {
    vars() {
        this.audios = document.querySelectorAll('.sound-dashboard')
    }

    addClassContainer() {
        this.containerInteraction.classList.add('bool')
    }

    bindMethods() {
        this.toogleBool = this.toogleBool.bind(this)
        this.sound = this.sound.bind(this)
    }

    initEvents() {
        this.element.addEventListener('mouseup', this.sound)
    }

    sound() {
        const sound = this.audios[Math.floor(Math.random() * this.audios.length )]
        sound.play()
    }

    displayInteraction(container) {
        const btn = document.createElement('span')
        btn.classList.add('grid-container__btn')
        btn.classList.add('js-sound-dashboard')
        btn.innerHTML = "ON"
        container.appendChild(btn)
        btn.addEventListener('click', this.toogleBool)

        this.interactions.push(btn)
        this.element = btn
    }

    toogleBool(e) {
        if(e.currentTarget.innerHTML === "ON") {
            e.currentTarget.innerHTML = "OFF"
            this.socket.emit('interaction:activated', { 'element' : { name : this.title.replace(/\W/g,'_').toLowerCase() }, 'actionMake' : "on" }, this.socket.id)
        } else {
            e.currentTarget.innerHTML = "ON"
            this.socket.emit('interaction:activated', { 'element' : { name : this.title.replace(/\W/g,'_').toLowerCase() }, 'actionMake' : "off" }, this.socket.id)
        }

    }

    destroy() {
        this.interactions.forEach((interaction) => {
            interaction.removeEventListener('click', this.toogleBool)
        })

        this.element.removeEventListener('mouseup', this.sound)
    }
}
