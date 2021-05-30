import Block from './Block'
import Bool from './interactions/Bool'
import List from './interactions/List'
import Cursor from './interactions/Cursor'
import Rotate from './interactions/Rotate'

import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(DrawSVGPlugin)
gsap.registerPlugin(MorphSVGPlugin)

export default class Dashboard extends Block {
    initEls() {
        this.$els = {
            grid: document.querySelector('.js-grid-container'),
            task: document.querySelector('.js-task'),
            scoreCursor: document.querySelector('.js-score-cursor'),
            scoreEnd: document.querySelector('.js-score-end'),
            timer:  document.querySelector('.js-timer'),
            name:  document.querySelector('.js-name')
        }
        this.cptCursors= 0
        this.tl
        this.tlCounter 
        this.score = 5 
        this.scoreHistoric = [5]
        this.tlScoreActive = false
    }

    bindMethods() {
        this.displayDashboard = this.displayDashboard.bind(this)
        this.displayTask = this.displayTask.bind(this)
        this.displayScore = this.displayScore.bind(this)
        this.killTimer = this.killTimer.bind(this)
        this.vibrate = this.vibrate.bind(this)
        this.configTimeline = this.configTimeline.bind(this)
    }

    initEvents() {
        window.history.pushState({}, '')
        this.socket.on('dashboard:display', this.displayDashboard)
        this.socket.on('dashboard:display-task', this.displayTask)
        this.socket.on('dashboard:update-score', this.displayScore)
        this.socket.on('dashboard:kill-timer', this.killTimer)
        this.socket.on('dashboard:vibrate', this.vibrate)
    }


    displayDashboard(currentUser, theme) {
        this.$els.name.innerHTML = theme.title

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
                case 'complex-cursor':
                    this.cptCursors ++
                    new Cursor(interaction.data.title, this.$els.grid, interaction.position, interaction.data.param, this.socket, interaction.orientation, this.cptCursors, interaction.type)
                    break
                case 'rotate':
                    new Rotate(interaction.data.title, this.$els.grid, interaction.position, interaction.data.param, this.socket)
                    break
            }
        })
    }

    displayTask(currentTask, timer) {
        this.$els.task.innerHTML = currentTask
        this.resetTimer(timer)
    }

    resetTimer(timer) {
        let shapes = "rect"

        this.tl = gsap.timeline({repeat:0})
        this.tl.from(shapes, { drawSVG:"0% 0%", duration: timer/1000})
    }

    configTimeline() {
    
        this.tlCounter.progress(0)  
    

        console.log(this.tlCounter.progress())
        this.$els.scoreCursor.style.transform = "translateY(-50%) rotate(0deg)"
        this.$els.scoreCursor.style.left =  (this.score * 29.3) - 13 + "px"

        this.tlScoreActive = false
        console.log(this.tlScoreActive)

        this.tlCounter.kill()
    }

    displayScore(score) {

        console.log(this.tlScoreActive)
        this.score = score
        this.scoreHistoric.push(score)


        MorphSVGPlugin.convertToPath("circle, polygon, ellipse")    
        let oneStep = document.getElementById("one")

        // if we loose a point
        if(this.scoreHistoric[this.scoreHistoric.length - 1] < this.scoreHistoric[this.scoreHistoric.length-2]){
            //reverse and deplace svg 
            this.$els.scoreCursor.style.transform = "translateY(-50%) rotate(180deg)"
            this.$els.scoreCursor.style.left = (this.score * 29.3) - 13  + "px" 
        } 

        this.tlCounter =  gsap.timeline({ onComplete: this.configTimeline,  repeat:0, repeatRefresh: true, delay:0,  id:"morphing", paused:true, defaults: {duration: 0.2} }) 


        this.tlCounter
        .to(oneStep, {fill: "#ff7384", morphSVG:"#one"})
        .to(oneStep, {fill: "#ff7384", morphSVG:"#two"})
        //.to(one, {fill: "#ff7384", morphSVG:"#three", duration: 0.15})
        //.to(one, {fill: "#0000FF", morphSVG:"#four", duration: 0.15}) 
        .to(oneStep, {fill: "#ff7384", morphSVG:"#five"}) 
        //.to(one, {fill: "#0000FF", morphSVG:"#six", duration: 0.15}) 
        .to(oneStep, {fill: "#5EE9F1", morphSVG:"#seven"}) 
        //.to(one, {fill: "#0000FF", morphSVG:"#eight", duration: 0.2}) 
        .to(oneStep, {fill: "#5EE9F1", morphSVG:"#nine"}) 

        this.tlCounter.play()


        if(!this.tlScoreActive){
            this.tlScoreActive = true
        } else {
            console.log("always true")
        }    
    }

    vibrate() {
        window.navigator.vibrate(30)
    }

    killTimer() {
        this.$els.timer.style.strokeDashoffset = 0
        if(this.tl) {
            this.tl.kill()
        }
    }

    destroy() {
        this.socket.removeListener('dashboard:display')
        this.socket.removeListener('dashboard:display-task')
        this.socket.removeListener('dashboard:update-score')
        this.socket.removeListener('dashboard:kill-timer')
        this.socket.removeListener('dashboard:vibrate')
        this.$els.timer.style.strokeDashoffset = 0
        this.tl.kill()
    }
}
