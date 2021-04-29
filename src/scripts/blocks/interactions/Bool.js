import Interaction from './Interaction'

export default class Bool extends Interaction {
    addClassContainer() {
        this.containerInteraction.classList.add('bool')
    }

    bindMethods() {
        this.toogleBool = this.toogleBool.bind(this)
    }

    displayInteraction(container) {
        const btn = document.createElement('span')
        btn.classList.add('grid-container__btn')
        btn.innerHTML = "ON"

        container.appendChild(btn)
        btn.addEventListener('click', this.toogleBool)

        this.interactions.push(btn)
    }

    toogleBool(e) {
        const name = e.currentTarget.parentElement.dataset
        if(e.currentTarget.innerHTML === "ON") {
            e.currentTarget.innerHTML = "OFF"
            this.socket.emit('interaction-activated', { 'element' : name, 'actionMake' : "on" })
        } else {
            e.currentTarget.innerHTML = "ON"
            this.socket.emit('interaction-activated', { 'element' : name, 'actionMake' : "off" })
        }
    }

    destroy() {
        this.interactions.forEach((interaction) => {
            interaction.removeEventListener('click', this.toogleBool)
        })
    }
}
