import Block from './Block'

export default class Dashboard extends Block {
    initEls() {
        this.$els = {
            grid: document.querySelector('.js-grid-container')
        }
    }

    bindMethods() {
        this.displayDashboard = this.displayDashboard.bind(this)
        this.toogleBool = this.toogleBool.bind(this)
    }

    initEvents() {
        this.socket.on('dashboard-info', this.displayDashboard)
    }

    displayDashboard(currentUser) {
        currentUser.dashboard.forEach((interaction) => {
            console.log(interaction)

            const divInteraction = document.createElement('div')
            divInteraction.classList.add(interaction.type)
            divInteraction.style.gridArea = interaction.position
            divInteraction.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16)

            const titleInteraction = document.createElement('p')
            titleInteraction.innerHTML = interaction.data.title

            this.$els.grid.appendChild(divInteraction)
            divInteraction.appendChild(titleInteraction)

            switch (interaction.type) {
                case 'bool':
                    this.displayBool(divInteraction)
                    break
                case 'simple-list':
                case 'complex-list':
                    this.displayList(divInteraction, interaction.data.param)
                    break
            }
        })
    }

    displayBool(bool) {
        const btn = document.createElement('span')
        btn.classList.add('grid-container__btn')
        btn.innerHTML = "ON"

        bool.appendChild(btn)

        btn.addEventListener('click', this.toogleBool)
    }

    toogleBool(e) {
        if(e.currentTarget.innerHTML === "ON") {
            e.currentTarget.innerHTML = "OFF"
        } else {
            e.currentTarget.innerHTML = "ON"
        }
    }

    displayList(list, parameters) {
        if(typeof parameters === 'string') {
            parameters = [parameters]
        }

        parameters.forEach((parameter) => {
            const param = document.createElement('span')
            param.classList.add('grid-container__btn')
            param.innerHTML = parameter
            list.appendChild(param)
        })
    }
}
