import * as paper from 'paper'
import perlinNoise3d from 'perlin-noise-3d'
import Circle from './shapes/Circle'
import Eight from './shapes/Eight'
import OutGrowth from './shapes/OutGrowth'
import Star from './shapes/Star'

export default class Test {
  constructor() {
    if(document.getElementById('blobs')) {
      this.bindMethods()
      this.initEls()
      this.initDraw()
    }
  }

  bindMethods() {
  }

  initEls() {
    this.$els = {
      canvas: document.getElementById('blobs')
    }

    this.$els.canvas.width = document.body.clientWidth
    this.$els.canvas.height = document.body.clientHeight

    paper.setup(this.$els.canvas)

    this.$els.canvas.width = document.body.clientWidth
    this.$els.canvas.height = document.body.clientHeight
    this.noise = new perlinNoise3d()
  }

  initDraw() {
    const shapes = []
    const textureRed = require('svg-inline-loader?classPrefix!./../../../assets/images/blobs/texture-red.svg')
    const textureBlue = require('svg-inline-loader?classPrefix!./../../../assets/images/blobs/texture-blue.svg')
    const textureWhite = require('svg-inline-loader?classPrefix!./../../../assets/images/blobs/texture-white.svg')

    console.log(textureRed)

    shapes.push(
        // Top
        new Circle(1, 0.8, 2, 2, 0, '#FE6A7A'),
        new Circle(1.2, 1, 1.2, 1.2, 0, '#5FE7EF'),
        new Eight(-3, -5.2,10, 7.8,-5,'#FCC5DD'),
        new OutGrowth(-1.5, 1.6,3, 2.5, -20, '#FFE202'),
        new OutGrowth(4.8, 1,2.2, 2, -200, '#FE6A7A', textureRed),
        new OutGrowth(1.5, -1,2.2, 2.4, 0, '#FFFDDF', textureWhite),
        new Circle(0.4, 0.6,0.8, 0.8, 0, '#FE6A7A'),
        new Circle(3, -0.4,1, 1, 0, '#6500FF'),

        // Bottom
        new Circle(1, 7.5,4, 3.5, 0, '#FE6A7A'),
        new Eight(-2, 8,6, 3, 20, '#6500FF'),
        new Eight(3, 8,5, 3, 80, '#5FE7EF'),
        new OutGrowth(4.6, 5.2,2.2, 2.4, 0, '#FFFDDF'),
        new Circle(-1, 5.4,2, 3, 0, '#5FE7EF', textureBlue),
        new OutGrowth(3, 8.2,1.6, 1.4, 45, '#FFE202'),
        new OutGrowth(-1, 9,1.6, 1.4, 0, '#FFE202'),
        new Circle(1, 9,0.7, 0.7, 0, '#5FE7EF'),
        new Circle(2.6, 8.5,0.9, 0.9, 0, '#FCC5DD'),
    )

    // Top
    new Star(4.6,2.6, 10, 0.7,0.35,0, '#FFE202')
    new Star(0.1,2.6, 10, 0.4,0.2,0, '#FE6A7A')
    new Star(2.1,2.1, 10, 0.2,0.1,0, '#6500FF')

    // Bottom
    new Star(5.5,6.5, 10, 0.4,0.2,0, '#5FE7EF')
    new Star(0.5,5.5, 10, 0.3,0.15,0, '#6500FF')
    new Star(3.5,8.9, 10, 0.3,0.15,0, '#FE6A7A')
    new Star(2,9, 10, 0.2,0.1,0, '#FFE202')
    new Star(1.8,7.9, 10, 0.5,0.25,0, '#5FE7EF')

    this.animation(shapes)
  }

  animation(shapes) {
    const noise = this.noise

    paper.view.onFrame = (event) => {
      shapes.forEach((shape, supraIndex) => {
        shape.finalPath.segments.forEach((segment, index) => {
          let turbulence = 1

          if (shape.turbulence > 1) {
            shape.turbulence = shape.turbulence - 0.001
          }
          turbulence = -2 * shape.turbulence * shape.turbulence + 6 * shape.turbulence - 3
          segment.point.x = shape.path.segments[index].point.x + (noise.get(index + supraIndex, 0, event.count * 0.003 + turbulence) - 0.5) * 25 * turbulence
          segment.point.y = shape.path.segments[index].point.y + (noise.get(0, index + supraIndex, event.count * 0.003 + turbulence) - 0.5) * 25 * turbulence
        })
      })
    }

    paper.view.onClick = function (e) {
      shapes.forEach((shape) => {
        if (shape.centerX < e.point.x + 30 && shape.centerX + shape.width > e.point.x - 30 && shape.centerY < e.point.y + 30 && shape.centerY + shape.height > e.point.y - 30 & shape.turbulence <= 1) {
          shape.turbulence = 2
        }
      })
    }
  }
}

new Test()
