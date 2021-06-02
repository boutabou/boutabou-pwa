import * as paper from 'paper'
import perlinNoise3d from 'perlin-noise-3d'
import Pages from './Pages'

export default class Blobs {
  constructor() {
    this.initEls()
    this.initDraw()
  }

  initEls() {
    this.$els = {}

    if(document.getElementById('blobs')) {
      this.$els = {
        canvas: document.getElementById('blobs'),
        pages: document.querySelector('.js-container-blobs')
      }

      this.$els.canvas.width = document.body.clientWidth
      this.$els.canvas.height = document.body.clientHeight
    }

    if(document.getElementById('blobs-popup')) {
      this.$els.canvasPopup = document.getElementById('blobs-popup')
      this.$els.canvasPopup.width = document.body.clientWidth
      this.$els.canvasPopup.height = document.body.clientHeight

    }

    this.noise = new perlinNoise3d()
  }

  initDraw() {
    if (this.$els.pages) {
      paper.setup(this.$els.canvas)
      const page = new Pages(this.$els.pages.dataset.pages)
      this.animation(page.getShapes())
    }

    if (this.$els.canvasPopup) {
      paper.setup(this.$els.canvasPopup)
      const pagePopup = new Pages('popup')
      this.animation(pagePopup.getShapes())
    }
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
          segment.point.x = shape.path.segments[index].point.x + (noise.get(index + supraIndex, 0, event.count * 0.003 + turbulence) - 0.5) * 30 * turbulence * (Math.min(shape.widthAsk, shape.heightAsk) ** 0.5)
          segment.point.y = shape.path.segments[index].point.y + (noise.get(0, index + supraIndex, event.count * 0.003 + turbulence) - 0.5) * 30 * turbulence * (Math.min(shape.widthAsk, shape.heightAsk) ** 0.5)
        })
      })
    }

    paper.view.onClick = function (e) {
      shapes.forEach((shape) => {
        if (shape.coorX < e.point.x + 30 && shape.coorX + shape.width > e.point.x - 30 && shape.coorY < e.point.y + 30 && shape.coorY + shape.height > e.point.y - 30 & shape.turbulence <= 1) {
          shape.turbulence = 2
        }
      })
    }

    window.onclick = function(e) {
      shapes.forEach((shape) => {
        if (shape.coorX < e.clientX + 30 && shape.coorX + shape.width > e.clientX - 30 && shape.coorY < e.clientY + 30 && shape.coorY + shape.height > e.clientY - 30 & shape.turbulence <= 1) {
          shape.turbulence = 2
        }
      })
    }
  }
}

new Blobs()
