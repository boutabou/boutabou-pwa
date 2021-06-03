import Block from './Block'
const levels = require('../../../server/data/levels.json')

export default class Defeat extends Block {
    initEls() {
        this.$els = {
          team: document.querySelector(".js-defeat__team"),
          comment: document.querySelector(".js-defeat__comment")
        }
    }

    bindMethods() {
        this.displayDefeat = this.displayDefeat.bind(this)
    }

    initEvents() {
        window.history.pushState({}, '')
        this.socket.on('defeat:loose', this.displayDefeat)

        setTimeout(() => {
            this.socket.off()
            this.socket.disconnect()
        }, 100)
    }

    displayDefeat(level) {
        this.$els.team.innerHTML = levels[level].team
        this.$els.comment.innerHTML = levels[level].comment
    }
}
