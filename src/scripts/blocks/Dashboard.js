import Block from './Block'

export default class Dashboard extends Block {
    initEls() {
        this.$els = {
            grid: document.querySelector('.js-grid-container')
        }
    }

    bindMethods() {
        this.displayDashboard = this.displayDashboard.bind(this)
    }

    initEvents() {
        this.socket.on('dashboard-info', this.displayDashboard)
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
}
