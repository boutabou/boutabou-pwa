import Interaction from './Interaction'


export default class Cursor extends Interaction {
    constructor(title, grid, position, params, socket, orientation, index) {
        super(title, grid, position, params, socket);

        this.orientation = orientation
        this.index = index

        this.bindMethods()
        this.displayCursor(this.containerInteraction, this.orientation, this.params, this.index)

        document.addEventListener('swup:willReplaceContent', () => {
            this.destroy()
        })
    }


    addClassContainer() {
        this.containerInteraction.classList.add('cursor-'+this.index)
    }

    bindMethods() {
        this.displayCursor = this.displayCursor.bind(this)
        this.displayVerticalCursor = this.displayVerticalCursor.bind(this)
        this.displayHorizontalCursor = this.displayHorizontalCursor.bind(this)
        this.onDragEnd = this.onDragEnd.bind(this)
        this.displayRotateCursor = this.displayInteraction.bind(this)
    }

    displayCursor(container, orientation, steps, index){
        const cursorContainer = document.createElement('div')
        const handleEl = document.createElement("div")
        const progressBar = document.createElement("div")
        const stepsContainer = document.createElement("div")
        let stepsEl = []

        cursorContainer.classList.add("container-cursor-"+index, "container-cursor", "container-cursor__"+orientation,  "container-cursor__"+orientation +"-"+steps.length)
        handleEl.classList.add("cursor", "cursor-"+orientation)
        handleEl.setAttribute("id", "cursor-"+index)
        progressBar.classList.add("progress-bar", "progress-" + orientation)
        stepsContainer.classList.add("steps", "steps-"+orientation)

        container.appendChild(cursorContainer)
        cursorContainer.appendChild(handleEl)
        cursorContainer.appendChild(progressBar)
        cursorContainer.appendChild(stepsContainer)

        steps.forEach((step, index) => {
            const step_index = document.createElement("div")
            step_index.classList.add("step-"+index)
            step_index.innerHTML = step
            stepsEl.push(step_index)
            stepsContainer.appendChild(step_index)

            this.interactions.push(step)
        })

        const currentCursor = document.getElementById("cursor-"+index)
        gsap.registerPlugin(Draggable);


        switch (orientation) {
            case "vertical":
                stepsEl.forEach((step, index) => {
                    step.style.height = "calc( 100% /" + stepsEl.length + ")";
                })
                this.displayVerticalCursor(currentCursor, stepsEl, index)
                break
            case "horizontal":
                stepsEl.forEach((step, index) => {
                    step.style.width = "calc( 100% /" + stepsEl.length + ")";
                })
                this.displayHorizontalCursor(currentCursor, stepsEl, index)
                break
        }
    }

    displayVerticalCursor(currentCursor, stepsEl, index) {

        const ctx = this
        let indexStep = 0

        Draggable.create(currentCursor, {
            type: "y",
            bounds: ".container-cursor-"+index,
            onDrag() {
                gsap.set(currentCursor, {
                    y: this.y
                })
            },
            onThrowUpdate() {
                    gsap.set(currentCursor, {
                        y: this.y
                    })
            },
            liveSnap: true,
            snap(value) {
                    indexStep = Math.round(value / this.maxY * (stepsEl.length - 1))

                    if (indexStep === 0) return 0
                    if (indexStep === stepsEl.length - 1) return this.maxY

                    return indexStep * (stepsEl[0].offsetHeight) -14 + 12.5
            },
            onDragEnd(e){
                ctx.onDragEnd(e, indexStep)
            }
        })
    }

    displayHorizontalCursor(currentCursor, stepsEl, index) {

        const ctx = this
        let indexStep = 0

        Draggable.create(currentCursor, {
            type: "x",
            bounds: ".container-cursor-"+index,
            onDrag() {
                    gsap.set(currentCursor, {
                        x: this.x
                    })
            },
            onThrowUpdate() {
                    gsap.set(currentCursor, {
                        x: 0
                    })
            },
            liveSnap: true,
            snap(value){
                indexStep =  Math.round(value / this.maxX * (stepsEl.length - 1))

                if (indexStep === 0) return 0
                if (indexStep === stepsEl.length - 1) return this.maxX

                return indexStep * (stepsEl[0].offsetWidth) -14 + 12.5
            },
            onDragEnd(e){
                ctx.onDragEnd(e, indexStep)
            }
        });
    }

    onDragEnd(e, indexStep) {
        const name = e.path[2].dataset
        this.socket.emit('interaction:activated', { 'element' : name, 'actionMake' : this.params[indexStep] })
    }
}




