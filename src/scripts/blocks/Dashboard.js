import Block from './Block'
import Bool from './interactions/Bool'
import List from './interactions/List'
import Cursor from './interactions/Cursor'
import Rotate from './interactions/Rotate'

export default class Dashboard extends Block {
    initEls() {
        this.$els = {
            grid: document.querySelector('.js-grid-container'),
            task: document.querySelector('.js-task'),
            score: document.querySelector('.js-score')
        }
    }

    bindMethods() {
        this.displayDashboard = this.displayDashboard.bind(this)
        this.displayTask = this.displayTask.bind(this)
        this.displayScore = this.displayScore.bind(this)
    }

    initEvents() {
        this.socket.on('dashboard:display', this.displayDashboard)
        this.socket.on('dashboard:give-task', this.displayTask)
        this.socket.on('dashboard:update-score', this.displayScore)
    }

    displayDashboard(currentUser) {

        currentUser.dashboard.forEach((interaction) => {

            switch (interaction.type) {
                case 'bool':
                    new Bool(interaction.data.title, this.$els.grid, interaction.position, null, this.socket)
                    break
                case 'simple-list':
                case 'complex-list':
                    new List(interaction.data.title, this.$els.grid, interaction.position, interaction.data.param, this.socket)
                    break
                case 'simple-cursor':
                case 'complex-list':
                    new Cursor(interaction.data.title, this.$els.grid, interaction.position, interaction.data.param, this.socket)
                    break
                case 'rotate':
                    new Rotate(interaction.data.title, this.$els.grid, interaction.position, interaction.data.param, this.socket)
                    break
            }
        })
    }

    displayTask(currentTask) {
        this.$els.task.innerHTML = currentTask
    }

    displayScore(score) {
        this.$els.score.innerHTML = score
    }

    destroy() {
        this.socket.removeListener('dashboard:display')
        this.socket.removeListener('dashboard:give-task')
        this.socket.removeListener('dashboard:update-score')
    }
}
