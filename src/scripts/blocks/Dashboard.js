import Block from './Block'
import { gsap } from "gsap";
import { Draggable} from "gsap/Draggable"; 


export default class Dashboard extends Block {
    initEls() {
        this.$els = {
            grid: document.querySelector('.js-grid-container'),
            cursor: document.querySelector('.js-simple-cursor'),
            cptCursors: 0
        } 
    }

    bindMethods() {
        this.displayDashboard = this.displayDashboard.bind(this)
        this.createCursorStructure = this.createCursorStructure.bind(this)
    }

    initEvents() {
        this.socket.on('dashboard-info', this.displayDashboard)
    }

    displayDashboard(currentUser) {
        currentUser.dashboard.forEach((interaction) => {
            const divInteraction = document.createElement('div')
            divInteraction.classList.add(interaction.type)
            divInteraction.style.gridArea = interaction.position
            divInteraction.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16)

            const titleInteraction = document.createElement('p')
            titleInteraction.innerHTML = interaction.data.title

            this.$els.grid.appendChild(divInteraction)
            divInteraction.appendChild(titleInteraction)

            switch (interaction.type) {
                case 'simple-cursor':
                    this.$els.cptCursors ++ 
                    this.createCursorStructure(divInteraction, interaction.orientation, interaction.data.step, this.$els.cptCursors)
                    break
                case 'complex-cursor':
                    this.$els.cptCursors ++
                    this.createCursorStructure(divInteraction, interaction.orientation, interaction.data.step, this.$els.cptCursors)
                    break
            }

        })
    }

    createCursorStructure(container, orientation, steps, index){

        const cursorContainer = document.createElement('div')
        const handleEl = document.createElement("div")
        const progressBar = document.createElement("div")
        const stepsContainer = document.createElement("div")
        let stepsEl = []   
          
        steps.forEach((step, index) => {
            const step_index = document.createElement("div")
            step_index.classList.add("step-"+index)
            step_index.innerHTML = step
            stepsEl.push(step_index)
            stepsContainer.appendChild(step_index)
        })

        cursorContainer.classList.add("container-cursor-"+index, "container-cursor")
        handleEl.classList.add("cursor", "cursor-"+orientation)
        handleEl.setAttribute("id", "cursor-"+index)
        progressBar.classList.add("progress-bar", "progress-" + orientation)
        stepsContainer.classList.add("steps", "steps-"+orientation)

        container.appendChild(cursorContainer)
        cursorContainer.appendChild(handleEl)
        cursorContainer.appendChild(progressBar)
        cursorContainer.appendChild(stepsContainer)

        const currentCursor = document.getElementById("cursor-"+index)

        if(orientation == "vertical"){
            stepsEl.forEach((step, index) => {
                step.style.height = "calc( 100% /" + stepsEl.length + ")";
            })
            this.displayVerticalCursor(currentCursor, stepsEl, index)
        } else if (orientation == "horizontal") {
            stepsEl.forEach((step, index) => {
                step.style.width = "calc( 100% /" + stepsEl.length + ")";
            })
            this.displayHorizontalCursor(currentCursor, stepsEl, index)
        }
    }

    displayVerticalCursor(currentCursor, stepsEl, index) {

        gsap.registerPlugin(Draggable);

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
            snap(value){
                    const index = Math.round(value / this.maxY * (stepsEl.length - 1))

                    // TODO : emit event avec la valeur
                    //this.socket.emit('interaction-activated', { 'element' : name, 'actionMake' : "ON" })
                    //console.log(steps[index])
                    
                    if (index === 0) return 0
                    if (index === stepsEl.length - 1) return this.maxY

                    return index * (stepsEl[0].offsetHeight) -14 + 12.5

            }
        });

    }

    displayHorizontalCursor(currentCursor, stepsEl, index) {
        gsap.registerPlugin(Draggable);

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
                    const index =  Math.round(value / this.maxX * (stepsEl.length - 1))
                    // TODO : emit event avec la valeur
                    //this.socket.emit('interaction-activated', { 'element' : name, 'actionMake' : "ON" })
                    //console.log(steps[index])
                    //console.log(index)
                    if (index === 0) return 0
                    if (index === stepsEl.length - 1) return this.maxX

                    return index * (stepsEl[0].offsetWidth) -14 + 12.5
            }
        });
    }


}
