import Interaction from './Interaction'

export default class Cursor extends Interaction {
    addClassContainer() {
        this.containerInteraction.classList.add('cursor-' + this.index)
        this.containerInteraction.classList.add(this.type)
    }

    displayCursor(container, orientation, steps, index) {
        const cursorContainer = document.createElement('div')
        const handleEl = document.createElement("div")
        const progressBar = document.createElement("div")
        const stepsContainer = document.createElement("div")
        let stepsEl = []

        cursorContainer.classList.add("container-cursor-" + index, "container-cursor", "container-cursor__" + orientation,  "container-cursor__" + orientation +"-" + steps.length)
        handleEl.classList.add("cursor", "cursor-" + orientation)
        handleEl.setAttribute("id", "cursor-" + index)
        progressBar.classList.add("progress-bar", "progress-" + orientation, "js-progress-" + index)
        stepsContainer.classList.add("steps", "steps-" + orientation)

        container.appendChild(cursorContainer)
        cursorContainer.appendChild(handleEl)
        cursorContainer.appendChild(progressBar)
        cursorContainer.appendChild(stepsContainer)

        steps.forEach((step, index) => {
            const stepIndex = document.createElement("div")
            stepIndex.classList.add("step-" + index)
            stepIndex.innerHTML = step
            stepsEl.push(stepIndex)
            stepsContainer.appendChild(stepIndex)

            this.interactions.push(step)
        })

        const currentCursor = document.getElementById("cursor-" + index)
        gsap.registerPlugin(Draggable)

        switch (orientation) {
            case "vertical":
                stepsEl.forEach((step, index) => {
                    step.style.height = "calc( 100% /" + stepsEl.length + ")"
                })
                this.displayVerticalCursor(currentCursor, stepsEl, index)
                break
            case "horizontal":
                stepsEl.forEach((step, index) => {
                    step.style.width = "calc( 100% /" + stepsEl.length + ")"
                })
                this.displayHorizontalCursor(currentCursor, stepsEl, index)
                break
        }
    }

    displayVerticalCursor(currentCursor, stepsEl, index) {

        const ctx = this
        let indexStep = 0
        let progressBar = document.querySelector(".js-progress-" + index)


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
                    progressBar.style.backgroundColor = "#040f33"

                    indexStep = Math.round(value / this.maxY * (stepsEl.length - 1))

                    if (indexStep === 0) return 0
                    if (indexStep === stepsEl.length - 1) return this.maxY

                    return indexStep * (stepsEl[0].offsetHeight) -14 + 12.5
            },
            onDragEnd(e){
                ctx.onDragEnd(e, indexStep)
                progressBar.style.backgroundColor = "#6500FF"
            }
        })
    }

    displayHorizontalCursor(currentCursor, stepsEl, index) {

        const ctx = this
        let indexStep = 0
        let progressBar = document.querySelector(".js-progress-"+index)

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

                progressBar.style.backgroundColor = "#040f33"

                indexStep =  Math.round(value / this.maxX * (stepsEl.length - 1))

                if (indexStep === 0) return 0
                if (indexStep === stepsEl.length - 1) return this.maxX


                return indexStep * (stepsEl[0].offsetWidth) -14 + 12.5
            },
            onDragEnd(e){
                ctx.onDragEnd(e, indexStep)
                progressBar.style.backgroundColor = "#6500FF"
            }
        })
    }

    onDragEnd(e, indexStep) {
        this.socket.emit('interaction:activated', { 'element' : { name : this.title.replace(/\W/g,'_').toLowerCase() }, 'actionMake' : this.params[indexStep]}, this.socket.id)
    }
}

