export default class Interaction {
    constructor(title, grid, position, params, socket, orientation, index, type) {
        this.title = title
        this.grid = grid
        this.position = position
        this.params = params
        this.socket = socket
        this.orientation = orientation
        this.index = index
        this.type = type
        this.containerInteraction
        this.interactions = []

        this.vars()
        this.bindMethods()
        this.createContainerInteraction()
        this.addClassContainer()
        this.displayInteraction(this.containerInteraction)
        this.displayCursor(this.containerInteraction, this.orientation, this.params, this.index)

        document.addEventListener('swup:willReplaceContent', () => {
            this.destroy()
        })
    }

    vars() {}

    bindMethods() {}

    createContainerInteraction() {
        const divInteraction = document.createElement('div')
        divInteraction.dataset.name = this.title.replace(/\W/g,'_').toLowerCase()
        divInteraction.style.gridArea = this.position

        const titleInteraction = document.createElement('p')
        titleInteraction.innerHTML = this.title

        this.grid.appendChild(divInteraction)
        divInteraction.appendChild(titleInteraction)

        this.containerInteraction = divInteraction
    }

    addClassContainer() {}

    displayInteraction(container) {}

    displayCursor(container, orientation, steps, index) {}

    destroy() {}
}
