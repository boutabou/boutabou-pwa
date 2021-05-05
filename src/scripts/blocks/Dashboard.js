import Block from './Block'
import Bool from './interactions/Bool'
import List from './interactions/List'
import Cursor from './interactions/Cursor'
import Rotate from './interactions/Rotate'

import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"


gsap.registerPlugin(DrawSVGPlugin)

export default class Dashboard extends Block {
    initEls() {
        this.$els = {
            grid: document.querySelector('.js-grid-container'),
            task: document.querySelector('.js-task'),
            /*timer: {
                "container" : document.querySelector('.js-timer'),
                "first" : document.querySelector('.first'),
                "second" : document.querySelector('.second'),
                "third" : document.querySelector('.third'),
                "fourth" : document.querySelector('.fourth'),
                "last" : document.querySelector('.last'),
            }  */
            timer:  document.querySelector('.js-timer')
        },
        this.cptCursors= 0
    }

    bindMethods() {
        this.displayDashboard = this.displayDashboard.bind(this)
        this.displayTask = this.displayTask.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
    }

    initEvents() {
        this.socket.on('dashboard:display', this.displayDashboard)
        this.socket.on('dashboard:give-task', this.displayTask)
        this.socket.on('dashboard:reset-timer', this.resetTimer)
    }

    displayDashboard(currentUser) {

        currentUser.dashboard.forEach((interaction) => {
            switch (interaction.type) {
                case 'bool':
                    new Bool(interaction.data.title, this.$els.grid, interaction.position, null, this.socket)
                    break
                case 'simple-list':
                case 'complex-list':
                    new List(interaction.data.title, this.$els.grid, interaction.position, interaction.data.param, this.socket)
                    break
                case 'simple-cursor':
                    this.$els.cptCursors ++ 
                    new Cursor(interaction.data.title, this.$els.grid, interaction.position, interaction.data.param, this.socket, interaction.orientation, this.$els.cptCursors)
                    break
                case 'complex-cursor':
                    this.$els.cptCursors ++ 
                    new Cursor(interaction.data.title, this.$els.grid, interaction.position, interaction.data.param, this.socket, interaction.orientation, this.$els.cptCursors)
                    break
                case 'rotate':
                    console.log(interaction)
                    new Rotate(interaction.data.title, this.$els.grid, interaction.position, interaction.data.param, this.socket)
                    break
            }
        })
    }

    displayTask(currentTask) {
        this.$els.task.innerHTML = currentTask
    }

    resetTimer(timer) {
        /*timer = timer + 1000
        console.log(timer)
        console.log()
        this.$els.timer["container"].classList.remove('active')

        this.$els.timer["first"].style.animationDuration = timer*0.2177+"ms"

        this.$els.timer["second"].style.animationDuration = timer*0.0645+"ms"
        this.$els.timer["second"].style.animationDelay = timer*0.2177 - 400+"ms"

        this.$els.timer["third"].style.animationDuration = timer*0.43+"ms"
        this.$els.timer["third"].style.animationDelay = (timer*0.2177) + (timer*0.0645) - 600 + "ms"

        this.$els.timer["fourth"].style.animationDuration = timer*0.0645+"ms"
        this.$els.timer["fourth"].style.animationDelay = (timer*0.0645) +(timer*0.2177) + (timer*0.43) - 800 + "ms"

        this.$els.timer["last"].style.animationDuration = timer*0.2177+"ms"
        this.$els.timer["last"].style.animationDelay = (timer*0.2177) + ((timer*0.0645)*2)  + (timer*0.43) - 1000 + "ms"
        setTimeout(()=> {
            this.$els.timer["container"].classList.add('active') 
        }, 100)*/

        //this.$els.timer.classList.remove('active')

        /*setTimeout(()=> {
            this.$els.timer.classList.add('active') 
        }, 100)*/

        var shapes = "rect",
		tl = gsap.timeline({repeat:0, yoyo:false});

        tl.from(shapes, timer/1000, { drawSVG:"0% 0%"}) 
        
    } 

    destroy() {
        this.socket.removeListener('dashboard:display')
        this.socket.removeListener('dashboard:give-task')
    }
}