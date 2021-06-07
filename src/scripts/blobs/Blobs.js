import * as paper from 'paper'
import perlinNoise3d from 'perlin-noise-3d'
import Pages from './Pages'

export default class Blobs {
  constructor() {
    this.initEls()
    this.bindMethods()
    this.initEvents()
    this.initDraw()
  }

  initEls() {
    this.$els = {}

    if(document.getElementById('blobs')) {
      this.$els = {
        canvas: document.getElementById('blobs'),
        pages: document.querySelector('.js-container-blobs'),
        popup: document.querySelector('.js-popup'),
        sound: document.querySelector('.sound-blob')
      }

      this.$els.canvas.width = document.body.clientWidth
      this.$els.canvas.height = document.body.clientHeight
    }

    if(document.getElementById('blobs-popup')) {
      this.$els.canvasPopup = document.getElementById('blobs-popup')
      this.$els.canvasPopup.width = document.body.clientWidth
      this.$els.canvasPopup.height = document.body.clientHeight

    }

    this.shapes = []
    this.avatars = []
    this.noise = new perlinNoise3d()
  }

  bindMethods() {
      this.addTurbulence = this.addTurbulence.bind(this)
  }

  initEvents() {
    window.onclick = this.addTurbulence
    window.onclick = this.addTurbulence
  }

  initDraw() {
    let pageShapes = []
    let popupShapes = []
    if (this.$els.pages) {
      paper.setup(this.$els.canvas)
      const page = new Pages(this.$els.pages.dataset.pages)
      pageShapes = page.getShapes()
      this.shapes.push(pageShapes)
      this.avatars = []
      this.avatars = page.getAvatars()
      this.animation(pageShapes, this.avatars)
    }

    if (this.$els.canvasPopup) {
      paper.setup(this.$els.canvasPopup)
      const pagePopup = new Pages('popup')
      popupShapes = pagePopup.getShapes()
      this.shapes.push(popupShapes)
      this.animation(popupShapes, [])
    }
  }

  animation(shapes, avatars) {
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

      avatars.forEach((avatar) => {
        avatar.animationFrame()
      })
    }
  }

  addTurbulence(e) {
    let cpt = 0

    if(!this.$els.sound) {
      this.$els.sound = document.querySelector('.sound-blob')
    }

    if(this.shapes !== [] && this.shapes && !e.delegateTarget && !e.target.classList.contains('js-sound-dashboard')) {
      if(this.$els.popup && !this.$els.popup.classList.contains('active') || !this.$els.popup) {
        if(this.shapes[0]) {
          this.shapes[0].forEach((shape) => {
            if (shape.coorX < e.clientX + 30 && shape.coorX + shape.width > e.clientX - 30 && shape.coorY < e.clientY + 30 && shape.coorY + shape.height > e.clientY - 30 & shape.turbulence <= 1) {
              shape.turbulence = 2
              if(cpt === 0) {
                this.$els.sound.play()
                cpt ++
              }
            }
          })
        }
      } else {
        if(this.shapes[1]) {
          this.shapes[1].forEach((shape) => {
            if (shape.coorX < e.clientX + 30 && shape.coorX + shape.width > e.clientX - 30 && shape.coorY < e.clientY + 30 && shape.coorY + shape.height > e.clientY - 30 & shape.turbulence <= 1) {
              shape.turbulence = 2
              if(cpt === 0) {
                this.$els.sound.play()
                cpt ++
              }
            }
          })
        }
      }
    }
  }
}

new Blobs()
