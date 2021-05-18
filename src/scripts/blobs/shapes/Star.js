import { Path } from 'paper'

export default class Star {
    constructor(centerX, centerY, points, radius1, radius2, rotate, color, texture) {
        this.vars(centerX, centerY, points, radius1, radius2, rotate, color, texture)
        this.drawStar()
    }

    vars(centerX, centerY, points, radius1, radius2, rotate, color, texture) {
        this.windowWidth = document.body.clientWidth
        this.windowHeight = document.body.clientHeight
        this.centerX = centerX * this.windowWidth / 6
        this.centerY = centerY * this.windowHeight / 10
        this.radius1 = radius1 * this.windowWidth / 6
        this.radius2 = radius2 * this.windowWidth / 6
        this.points = points
        this.rotate = rotate
        this.color = color
        this.texture = texture
    }

    drawStar() {
        const star = new Path.Star({ 'x': this.centerX, 'y': this.centerY } , this.points, this.radius1, this.radius2)
        star.fillColor = this.color
        star.rotate(this.rotate)
    }
}
