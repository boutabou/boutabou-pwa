import { Path, Point, Rectangle, Size } from 'paper'

export default class Rect {
    constructor(coorX, coorY, width, height) {
        this.vars(coorX, coorY, width, height)
        this.drawRect()
    }

    vars(coorX, coorY, width, height) {
        this.windowWidth = document.body.clientWidth
        this.windowHeight = document.body.clientHeight
        this.coorX = coorX * this.windowWidth / 6
        this.coorY = coorY * this.windowHeight / 10
        this.width = width * this.windowWidth / 6
        this.height = height * this.windowWidth / 6
    }

    drawRect() {
        var rectangle = new Rectangle(new Point(this.coorX, this.coorY), new Point(this.coorX + this.width, this.coorY + this.height));
        var radius = new Size(20, 20);
        var path = new Path.Rectangle(rectangle, radius);
        // path.fillColor = '#5FE7EF';
        path.clipMask = true
    }
}
