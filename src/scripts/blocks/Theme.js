import Block from './Block'

export default class Theme extends Block {
    initEvents() {
        window.history.pushState({}, '')
    }
}
