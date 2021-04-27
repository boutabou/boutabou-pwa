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
        // this.socket.on('dashboard-info', this.displayDashboard)
        this.displayBool()
    }

    displayDashboard(currentUser) {
        currentUser.dashboard.forEach((interaction) => {
            const divInteraction = document.createElement('div')
            divInteraction.classList.add(interaction.type)
            divInteraction.style.gridArea = interaction.position
            divInteraction.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16)

            const titleInteraction = document.createElement('p')
            titleInteraction.innerHTML = interaction.data.title

            this.$els.grid.appendChild(divInteraction)
            divInteraction.appendChild(titleInteraction)
        })
    }

    displayBool() {
        const bools = this.$els.grid.querySelectorAll('.bool')

        bools.forEach((bool) => {
            const btn = document.createElement('span')
            btn.classList.add('bool__btn')
            btn.innerHTML = "ON"

            bool.appendChild(btn)

            btn.addEventListener('click', this.toogleBool)
        })
    }

    toogleBool(e) {
        if(e.currentTarget.innerHTML === "ON") {
            e.currentTarget.innerHTML = "OFF"
        } else {
            e.currentTarget.innerHTML = "ON"
        }
    }
}
