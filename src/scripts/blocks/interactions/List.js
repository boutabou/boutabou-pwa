import Interaction from './Interaction'

export default class List extends Interaction {
    vars() {
        this.audios = document.querySelectorAll('.sound-dashboard')
    }

    addClassContainer() {
        this.containerInteraction.classList.add('list')
    }

    bindMethods() {
        this.clickListBtn = this.clickListBtn.bind(this)
        this.sound = this.sound.bind(this)
    }

    initEvents() {
        this.elements.forEach((element) => {
            element.addEventListener('mouseup', this.sound)
        })
    }

    sound() {
        const sound = this.audios[Math.floor(Math.random() * this.audios.length )]
        sound.play()
    }

    displayInteraction(container) {
        if(typeof this.params === 'string') {
            this.params = [this.params]
        }

        this.elements = []

        this.params.forEach((parameter) => {
            const param = document.createElement('span')
            param.dataset.btnName = parameter.replace(/\W/g,'_').toLowerCase()
            param.classList.add('grid-container__btn')
            param.classList.add('js-sound-dashboard')
            param.innerHTML = parameter
            container.appendChild(param)

            this.interactions.push(param)
            this.elements.push(param)

            param.addEventListener('click', this.clickListBtn)
        })
    }

    clickListBtn(e) {
        this.socket.emit('interaction:activated', { 'element' : { name : this.title.replace(/\W/g,'_').toLowerCase() }, 'actionMake' : e.currentTarget.dataset.btnName }, this.socket.id)
    }

    destroy() {
        this.interactions.forEach((interaction) => {
            interaction.removeEventListener('click', this.clickListBtn)
        })

        this.elements.forEach((element) => {
            element.removeListener('mouseup', this.sound)
        })
    }
}
