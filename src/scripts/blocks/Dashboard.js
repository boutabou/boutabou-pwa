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
            name:  document.querySelector('.js-name'),
            level: document.querySelector('.js-level'),
            oneStep:  document.getElementById("one") 
        }
        this.cptCursors= 0
        this.tl
        this.score = 5
        this.scoreFront = 5
        this.scoreOnAnim = false
        this.tlCounter  = gsap.timeline({ 
            onComplete: this.configTimeline, 
            defaults: {
                duration: 0.2
            } 
        }) 

        this.tlCounter
        .to(this.$els.oneStep, {fill: "#ff7384", morphSVG:"#one"})
        .to(this.$els.oneStep, {fill: "#ff7384", morphSVG:"#two"})
        .to(this.$els.oneStep, {fill: "#ff7384", morphSVG:"#five"}) 
        .to(this.$els.oneStep, {fill: "#5EE9F1", morphSVG:"#seven"}) 
        .to(this.$els.oneStep, {fill: "#5EE9F1", morphSVG:"#nine"})    
    }

    bindMethods() {
        this.displayDashboard = this.displayDashboard.bind(this)
        this.displayTask = this.displayTask.bind(this)
        this.displayLevel = this.displayLevel.bind(this)
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
        this.socket.on('dashboard:display-level', this.displayLevel)
    }

    displayLevel(level) {
        this.$els.level.innerHTML = "Niveau " + level
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
        let shapes = this.$els.timer

        this.tl = gsap.timeline({repeat:0})
        this.tl.from(shapes, { drawSVG: "0% 0%", duration: timer/1000}) 
    }

    configTimeline() {

        if(this.scoreUpgrade) {
            this.scoreFront ++ 
        } else {
            this.scoreFront -- 
        }

        if(this.score !== this.scoreFront) {
            console.log("in oncomplete restart anim")
            this.activeScoreTimeline()
        }
    
        //this.tlCounter.progress(0)  
        this.$els.scoreCursor.style.transform = "translateY(-50%) rotate(0deg)"
        this.$els.scoreCursor.style.left =  (this.scoreFront * 29.3) - 13 + "px"

        this.scoreOnAnim = false
    }

    displayScore(score) {

        this.score = score

        console.log("score", this.score)
        console.log("scoreFront", this.scoreFront)
        if(!this.scoreOnAnim && this.score !== this.scoreFront) {
            this.activeScoreTimeline()
        }

    }

    activeScoreTimeline() {

            this.scoreOnAnim = true
            this.scoreUpgrade = true

            if (this.score < this.scoreFront) {
                this.$els.scoreCursor.style.transform = "translateY(-50%) rotate(180deg)"
                this.$els.scoreCursor.style.left = (this.scoreFront * 29.3) - 13  + "px" 

                this.scoreUpgrade = false
            } 

            MorphSVGPlugin.convertToPath("circle, polygon, ellipse")    
            this.tlCounter.play()  
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
