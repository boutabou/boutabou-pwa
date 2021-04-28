import Interaction from './Interaction'

export default class List extends Interaction {
    addClassContainer() {
        this.containerInteraction.classList.add('list')
    }

    bindMethods() {
        this.clickListBtn = this.clickListBtn.bind(this)
    }

    displayInteraction(container) {
        if(typeof this.params === 'string') {
            this.params = [this.params]
        }

        this.params.forEach((parameter) => {
            const param = document.createElement('span')
            param.dataset.btnName = parameter.replace(/\W/g,'_').toLowerCase()
            param.classList.add('grid-container__btn')
            param.innerHTML = parameter
            container.appendChild(param)

            this.interactions.push(param)

            param.addEventListener('click', this.clickListBtn)
        })
    }

    clickListBtn(e) {
        const name = e.currentTarget.parentElement.dataset
        this.socket.emit('interaction-activated', { 'element' : name, 'actionMake' : e.currentTarget.dataset.btnName })
    }

    destroy() {
        this.interactions.forEach((interaction) => {
            interaction.removeEventListener('click', this.clickListBtn)
        })
    }
}
