import Block from './Block'
import { gsap } from "gsap";
import { Draggable} from "gsap/Draggable";


export default class Dashboard extends Block {
    initEls() {
        this.$els = {
            grid: document.querySelector('.js-grid-container'),
            cursor: document.querySelector('.js-simple-cursor'),
            radio: {
                progressEl: document.querySelector('.progress'),
                spans: document.querySelectorAll('.steps div:not(.box)')

            } 
        }
    }

    bindMethods() {
        this.displayDashboard = this.displayDashboard.bind(this)
        this.displayCursor = this.displayCursor.bind(this)

    }

    initEvents() {
        //this.socket.on('dashboard-info', this.displayDashboard)
        this.displayCursor() 
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
        })
    }

    displayCursor(){
        gsap.registerPlugin(Draggable);

        const ctxRadio = this.$els.radio
        const ctx = this

        let box = document.getElementsByClassName("box");

        Draggable.create(box, {
            type: "y",
            bounds: ".container-cursor",
            onDrag() {
                console.log("drag")
                gsap.set(box, { 
                    y: this.y
                })
            },
            onThrowUpdate() {
                gsap.set(box, { 
                    y: this.y
                })
            },
            liveSnap: true,
            snap(value){
                const index = Math.round(value / this.maxY * (ctxRadio.spans.length - 1))
                
                if (index === 0) return 0
                if (index === ctxRadio.spans.length - 1) return this.maxY

                return (index - 0.5) * (ctxRadio.spans[1].offsetHeight/2) + ctxRadio.spans[0].offsetHeight
            }
        });

    }

    getComputedTranslateY(obj)
    {
        if(!window.getComputedStyle) return;
        var style = getComputedStyle(obj),
            transform = style.transform || style.webkitTransform || style.mozTransform;
        var mat = transform.match(/^matrix3d\((.+)\)$/);
        if(mat) return parseFloat(mat[1].split(', ')[13]);
        mat = transform.match(/^matrix\((.+)\)$/);
        return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
    }

    offsetBounds() {    
        // Simulate offset
        var maxX = this.maxX - 100;
        var maxY = this.maxY - 50;
        if (this.x > maxX) TweenLite.set(box, { x: maxX });
        if (this.y > maxY) TweenLite.set(box, { y: maxY });
    }
}
