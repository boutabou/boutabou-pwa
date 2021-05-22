import { Group, Path } from 'paper'
import * as paper from 'paper'
import perlinNoise3d from 'perlin-noise-3d'

export default class Shape {
    constructor(centerX, centerY, width, height, rotate, color, texture) {
        this.vars(centerX, centerY, width, height, rotate, color, texture)
        this.drawShape(this.path, this.centerX, this.centerY, this.width, this.height)
        this.path.closed = true
        this.path.smooth()
        this.path.rotate(this.rotate)
        this.path.fillColor = this.color
        this.addNoise()
    }

    vars(centerX, centerY, width, height, rotate, color, texture) {
        this.windowWidth = document.body.clientWidth
        this.windowHeight = document.body.clientHeight
        this.centerX = centerX * this.windowWidth / 6
        this.centerY = centerY * this.windowHeight / 10
        this.width = width * this.windowWidth / 6
        this.height = height * this.windowHeight / 10
        this.widthAsk = width
        this.heightAsk = height
        this.rotate = rotate
        this.color = color
        // this.texture = texture
        this.path = new Path()
        this.finalPath
        this.turbulence = 1
        this.noise = new perlinNoise3d()
    }

    drawShape(path, centerX, centerY, width, height) {}

    addNoise() {
        this.path.segments.forEach((segment, index) => {
            segment.point.x = segment.point.x + (Math.random() - 0.5) * this.widthAsk
            segment.point.y = segment.point.y + (Math.random() - 0.5) * this.heightAsk
        })

        this.finalPath = this.path.clone()
        this.finalPath.fillColor = this.color

        if(this.texture) {
            let texture

            paper.project.importSVG(this.texture, (item) => {
                texture = item
                texture.scale(0.5)
                texture.position = new paper.Point(this.path.segments[0].point.x -50, this.path.segments[1].point.y -50)
                var group = new Group([texture, this.finalPath])
                this.finalPath.clipMask = true
            })
        }

        this.path.visible = false
        this.finalPath.visible = true
    }
}
