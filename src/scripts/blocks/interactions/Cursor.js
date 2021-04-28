import Interaction from './Interaction'

export default class Cursor extends Interaction {
    addClassContainer() {
        this.containerInteraction.classList.add('cursor')
    }
}
