import Interaction from './Interaction'

export default class Rotate extends Interaction {
    addClassContainer() {
        this.containerInteraction.classList.add('rotate')
    }
}
