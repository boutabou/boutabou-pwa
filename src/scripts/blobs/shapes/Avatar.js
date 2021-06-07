import { Path, Point, Raster } from 'paper'
import perlinNoise3d from 'perlin-noise-3d'
const avatarData = require('../../../../server/data/avatars-icon.json')

export default class Avatar {
    constructor(centerX, centerY, width, index) {
        this.vars(centerX, centerY, width, index)
        this.bindMethods()
        this.initEvents()
        this.displayAvatar()
    }

    vars(centerX, centerY, width, index) {
        this.windowWidth = document.body.clientWidth
        this.windowHeight = document.body.clientHeight
        this.centerX = centerX * this.windowWidth / 6
        this.centerY = centerY * this.windowHeight / 10
        this.width = width * this.windowWidth / 6

        this.avatar = avatarData.avatarUrl[index]
        this.url = avatarData.avatarBaseUrl + this.avatar.url
        this.color = avatarData.colors[this.avatar.bgColor]

        this.nbRandomCircle = 8
        this.randomCircles = []
        this.path = new Path()
        this.noise = new perlinNoise3d()

        this.frame = 0
        this.onAnim = false

        this.sound = document.querySelector('.sound-blob')
        this.avatarElt = document.querySelector('.js-avatar')
        this.avatarElt.dataset.avatarIndex = index
    }

    bindMethods() {
        this.animation = this.animation.bind(this)
        this.animationFrame = this.animationFrame.bind(this)
    }

    initEvents() {
        window.onclick = this.animation
    }

    displayAvatar() {
        this.drawCircle()

        if(this.url) {
            this.raster = new Raster(this.url)
            this.raster.scale(0.8)

            this.raster.onLoad = () => {
                this.raster.position = new Point(this.centerX, this.centerY)

                this.path.fillColor = this.color
                this.finalPath.fillColor = this.color
                this.randomCircles.forEach((circle) => {
                    circle.fillColor = this.color
                })
            }
        }
    }

    changeAvatar() {
        const alea = Math.floor((Math.random() * avatarData.avatarUrl.length))
        this.avatar = avatarData.avatarUrl[alea]
        this.url = avatarData.avatarBaseUrl + this.avatar.url
        this.color = avatarData.colors[this.avatar.bgColor]

        if(this.url) {
            this.raster.source = this.url
        }

        this.avatarElt.dataset.avatarIndex = alea
    }

    drawCircle() {
        for(let i = 0; i < 2 * Math.PI; i = i + (Math.PI / this.nbRandomCircle)) {
            this.path.add(new Point(this.centerX + Math.cos(i) * this.width / 2, this.centerY + Math.sin(i) * this.width / 2))
        }

        this.path.fillColor = this.color
        this.path.closed = true
        this.path.smooth()
        this.finalPath = this.path.clone()
        this.path.visible = false
    }

    drawRandomCircle() {
        for(let i = 0; i < 2 * Math.PI; i = i + (Math.PI * 2 / this.nbRandomCircle)) {

            let factor = Math.random() * 1.2 - 0.2

            if (factor < 0.2) {
                factor = 0
            }

            this.randomCircles.push(
                {
                    path: new Path.Circle({
                        center: [this.centerX + Math.cos(i) * this.width / 2, this.centerY + Math.sin(i) * this.width / 2],
                        radius:  factor * 28,
                        fillColor: this.color
                    }),
                    frame: 0,
                    onAnim: true,
                    factor
                }
            )
        }
    }

    animation(e) {
        if(!this.sound) {
            this.sound = document.querySelector('.sound-blob')
        }

        if(!e.target.classList.contains('js-container-pseudo') && !e.target.classList.contains('js-username') && !e.target.classList.contains('js-split-text') && e.target.classList.length !== 0) {
            if (this.centerX - (this.width / 2) < e.clientX && this.centerX + (this.width / 2) > e.clientX && this.centerY - (this.width / 2) < e.clientY && this.centerY + (this.width / 2) > e.clientY) {
                this.changeAvatar()
                this.randomCircles.forEach((circle) => {
                    circle.path.visible = false
                })
                this.randomCircles = []
                this.drawRandomCircle()
                this.randomCircles.forEach((circle) => {
                    circle.path.sendToBack()
                })
                this.onAnim = true
                this.sound.play()
            }
        }
    }

    animationFrame() {
        this.frame = this.frame + 2

        this.finalPath.segments.forEach((segment, index) => {
            this.segmentCircleAnimLoop(index, this.frame)
        })

        this.randomCircles.forEach((circle, index) => {
            if(circle.onAnim) {
                circle.frame = circle.frame + 2

                if (circle.frame >= 300) {
                    this.onAnim = false
                    circle.onAnim = false
                    circle.frame = 0
                }

                let y = this.ease(circle.frame)
                let yBoomrang = this.easeBoomrang(circle.frame)

                circle.path.position = [this.centerX + Math.cos(index * (Math.PI * 2 / this.nbRandomCircle)) * (this.width + y - 40) / 2, this.centerY + Math.sin(index * (Math.PI * 2 / this.nbRandomCircle)) * (this.width + y - 40) / 2]
                circle.path.scale(1 - (circle.frame * 0.002))

                this.segmentCircleAnim(index * 2, yBoomrang, circle.factor)
                this.segmentCircleAnim(index * 2 - 1, yBoomrang, circle.factor / 4)
                this.segmentCircleAnim(index * 2 + 1, yBoomrang, circle.factor / 4)
                this.finalPath.smooth()
            }
        })
    }

    segmentCircleAnim(index, y, factor) {
        if(index < 0) {
            index = this.finalPath.segments.length - 1
        }

        if(index > this.finalPath.segments.length - 1) {
            index = 0
        }
        this.finalPath.segments[index].point.x = this.path.segments[index].point.x + Math.cos(index * Math.PI / this.nbRandomCircle) * y * factor + (this.noise.get(index / 10, 0, this.frame / 400) - 0.5) * 25
        this.finalPath.segments[index].point.y = this.path.segments[index].point.y + Math.sin(index * Math.PI / this.nbRandomCircle) * y * factor + (this.noise.get(0, index / 10, this.frame / 400) - 0.5) * 25
    }

    segmentCircleAnimLoop(index, frame) {
        if(!this.onAnim) {
            this.finalPath.segments[index].point.x = this.path.segments[index].point.x + (this.noise.get(index / 10, 0, frame / 400) - 0.5) * 25
            this.finalPath.segments[index].point.y = this.path.segments[index].point.y + (this.noise.get(0, index / 10, frame / 400) - 0.5) * 25
            this.finalPath.smooth()
        }
    }

    ease(x) {
        return (-1 / 2500 * x * x / 14 + 51 / 2500 * x / 4) * 500
    }

    easeBoomrang(x) {
        return (-Math.cos(x / 10) + 1) * 300 / x
    }
}
