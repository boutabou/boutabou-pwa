import Block from './Block'

export default class WaitScan extends Block {
    initEvents() {
        window.history.pushState({}, '')
    }
}
