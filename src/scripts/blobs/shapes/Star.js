import {Path} from "paper";
import perlinNoise3d from "perlin-noise-3d";

export default class Star {
    constructor(centerX, centerY, points, radius1, radius2, rotate, color, texture) {
        this.vars(centerX, centerY, points, radius1, radius2, rotate, color, texture);
        this.drawStar();
    }

    vars(centerX, centerY, points, radius1, radius2, rotate, color, texture) {
        this.windowWidth = document.body.clientWidth;
        this.windowHeight = document.body.clientHeight;
        this.centerX = centerX * this.windowWidth / 12;
        this.centerY = centerY * this.windowHeight / 20;
        this.radius1 = radius1 * this.windowWidth / 12;
        this.radius2 = radius2 * this.windowWidth / 12;
        this.points = points;
        this.rotate = rotate;
        this.color = color;
        this.texture = texture;
    }

    drawStar() {
        const star = new Path.Star({ 'x': this.centerX, 'y': this.centerY } , this.points, this.radius1, this.radius2);
        star.fillColor = this.color;
        star.rotate(this.rotate);
    }
}
