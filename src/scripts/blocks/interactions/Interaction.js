export default class Interaction {
    constructor(title, grid, position, params, socket) {
        this.title = title
        this.grid = grid
        this.position = position
        this.params = params
        this.socket = socket
        this.containerInteraction
        this.interactions = []


        this.bindMethods()
        this.createContainerInteraction()
        this.addClassContainer()
        this.displayInteraction(this.containerInteraction)

        document.addEventListener('swup:willReplaceContent', () => {
            this.destroy()
        })
    }

    bindMethods() {}

    createContainerInteraction() {
        const divInteraction = document.createElement('div')
        divInteraction.dataset.name = this.title.replace(/\W/g,'_').toLowerCase()
        divInteraction.style.gridArea = this.position
        //divInteraction.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16)

        const titleInteraction = document.createElement('p')
        titleInteraction.innerHTML = this.title

        this.grid.appendChild(divInteraction)
        divInteraction.appendChild(titleInteraction)

        this.containerInteraction = divInteraction
    }

    addClassContainer() {}

    displayInteraction(container) {}

    destroy() {}
}
