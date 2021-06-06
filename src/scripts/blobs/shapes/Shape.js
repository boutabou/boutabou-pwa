import { Group, Path, Raster, Point } from 'paper'
import perlinNoise3d from 'perlin-noise-3d'

export default class Shape {
    constructor(coorX, coorY, width, height, rotate, color, texture) {
        this.vars(coorX, coorY, width, height, rotate, color, texture)
        this.drawShape(this.path, this.width, this.height)
        this.path.closed = true
        this.path.smooth()
        this.path.rotate(this.rotate)
        this.path.fillColor = this.color
        this.addNoise()
    }

    vars(coorX, coorY, width, height, rotate, color, texture) {
        this.windowWidth = document.body.clientWidth
        this.windowHeight = document.body.clientHeight
        this.coorX = coorX * this.windowWidth / 6
        this.coorY = coorY * this.windowHeight / 10
        this.width = width * this.windowWidth / 6
        this.height = height * this.windowHeight / 10
        this.widthAsk = width
        this.heightAsk = height
        this.rotate = rotate
        this.color = color
        this.texture = texture
        this.path = new Path()
        this.finalPath
        this.turbulence = 1
        this.noise = new perlinNoise3d()
    }

    drawShape(path, width, height) {}

    addNoise() {
        this.path.segments.forEach((segment, index) => {
            segment.point.x = segment.point.x + this.coorX + (Math.random() - 0.5) * this.widthAsk
            segment.point.y = segment.point.y + this.coorY + (Math.random() - 0.5) * this.heightAsk
        })

        this.finalPath = this.path.clone()
        this.finalPath.fillColor = this.color

        if(this.texture && this.texture !== '') {
            const raster = new Raster(this.texture)

            raster.position = new Point(this.coorX + raster.width / 2 - 50, this.coorY + raster.height / 2 - 50)
            raster.scale(Math.max((this.width + 100) / raster.width, (this.height + 100) / raster.height))

            new Group([raster, this.finalPath])
            this.finalPath.clipMask = true
        }

        this.path.visible = false
        this.finalPath.visible = true
    }
}
