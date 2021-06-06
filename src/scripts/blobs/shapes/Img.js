import { Point, Raster } from 'paper'

export default class Img {
    constructor(centerX, centerY, path) {
        this.vars(centerX, centerY, path)
        this.displayImg()
    }

    vars(centerX, centerY, path) {
        this.windowWidth = document.body.clientWidth
        this.windowHeight = document.body.clientHeight
        this.centerX = centerX * this.windowWidth / 6
        this.centerY = centerY * this.windowHeight / 10
        this.width = 1.8 * this.windowWidth / 6
        this.path = path
    }

    displayImg() {
        if(this.path) {
            const raster = new Raster(this.path)

            raster.onLoad = () => {
                raster.position = new Point(this.centerX, this.centerY)
                raster.scale(this.width / raster.width)
            }
        }
    }
}
