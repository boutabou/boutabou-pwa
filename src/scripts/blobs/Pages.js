import Circle from './shapes/Circle'
import Eight from './shapes/Eight'
import OutGrowth from './shapes/OutGrowth'
import Star from './shapes/Star'
import Rect from './shapes/Rect'
import Img from './shapes/Img'
import Avatar from './shapes/Avatar'

export default class Pages {
    constructor(page) {
        this.vars()
        this.initDraw(page)
    }

    vars() {
        this.shapes = []
        this.avatars = []
        this.textureRed = './../../../assets/images/blobs/texture-red.png'
        this.textureBlue = './../../../assets/images/blobs/texture-blue.png'
        this.textureWhite = './../../../assets/images/blobs/texture-white.png'
        this.texturePurple = './../../../assets/images/blobs/texture-purple.png'
    }

    initDraw(page) {
        switch (page) {
            case "welcome":
                this.drawWelcome()
                break
            case "popup":
                this.drawPopUp()
                break
            case "room":
                this.drawRoom()
                break
            case "theme":
            case "result-theme":
                const path = document.querySelector('main').dataset.path

                if(path && path !== '') {
                    this.drawTheme(path)
                }
                break
            case "game":
                this.drawGame()
                break
            case "winner":
                this.drawWinner()
                break
            case "login":
                this.drawLogin()
                break
            case "defeat":
                this.drawDefeat()
                break
        }
    }

    drawWelcome() {
        this.shapes.push(
            // Top
            new Circle(1, -0.2, 2, 2, 0, '#FE6A7A'),
            new Circle(1.2, 0, 1.2, 1.2, 0, '#5FE7EF'),
            new Eight(-3, -6.2,10, 7.8,-5,'#FCC5DD'),
            new OutGrowth(-1.5, 0.6,3, 2.5, -20, '#FFE202'),
            new OutGrowth(4.8, 0,2.2, 3, -20, '#FE6A7A', this.textureRed),
            new OutGrowth(1.5, -1.8,2.5, 2.4, 0, '#FFFDDF', this.textureWhite),
            new Circle(0.4, -0.4,1, 1, 0, '#FE6A7A'),
            new Circle(3, -1.4,1, 1, 0, '#6500FF'),

            // Bottom
            new Circle(0.5, 7.7,5, 3.5, 0, '#FE6A7A'),
            new Eight(-2, 8,6, 3, 20, '#6500FF'),
            new Eight(3, 8.4,5, 3, 80, '#5FE7EF'),
            new OutGrowth(5.5, 5.2,2.2, 3.4, 0, '#FFFDDF'),
            new Circle(-1.5, 5.4,2, 3, 0, '#5FE7EF', this.textureBlue),
            new OutGrowth(3, 8.2,1.6, 1.4, 45, '#FFE202'),
            new OutGrowth(-1, 9,1.6, 1.4, 0, '#FFE202'),
            new Circle(1, 9,0.7, 0.7, 0, '#5FE7EF'),
        )

        // Top
        new Star(5,2.8, 10, 0.7,0.35,0, '#5FE7EF')
        new Star(0.1,2, 10, 0.3,0.15,0, '#FE6A7A')
        new Star(3.9,1.1, 10, 0.4,0.2,0, '#6500FF')
        new Star(5,5, 10, 0.2,0.1,0, '#FFE202')
        new Star(1, 4, 10, 0.4,0.2,0, '#FE6A7A')

        // Bottom
        new Star(0.3,6.2, 10, 0.3,0.15,0, '#6500FF')
        new Star(3.5,8.9, 10, 0.3,0.15,0, '#FE6A7A')
        new Star(2,9, 10, 0.2,0.1,0, '#FFE202')
        new Star(1.6,8.1, 10, 0.4,0.2,0, '#5FE7EF')
    }

    drawPopUp() {
        this.shapes.push(
            // Top
            new Circle(1, 0.8, 2, 2, 0, '#FE6A7A'),
            new Circle(1.2, 1, 1.2, 1.2, 0, '#5FE7EF'),
            new Eight(-3, -5.2,10, 7.8,-5,'#FCC5DD'),
            new OutGrowth(-1.5, 1.6,3, 2.5, -20, '#FFE202'),
            new OutGrowth(4.8, 1,2.2, 2, -200, '#FE6A7A', this.textureRed),
            new OutGrowth(1.5, -1,2.2, 2.4, 0, '#FFFDDF', this.textureWhite),
            new Circle(0.4, 0.6,0.8, 0.8, 0, '#FE6A7A'),
            new Circle(3, -0.4,1, 1, 0, '#6500FF'),

            // Bottom
            new Circle(1, 7.5,4, 3.5, 0, '#FE6A7A'),
            new Eight(-2.2, 8.8,6, 3, 20, '#6500FF'),
            new Eight(-2, 8,6, 3, 20, '#6500FF', this.texturePurple),
            new Eight(3, 8,5, 3, 80, '#5FE7EF'),
            new OutGrowth(4.6, 5.2,2.2, 3.4, 0, '#FFFDDF'),
            new Circle(-1.2, 5.5, 2, 2.8, 0, '#5FE7EF'),
            new Circle(-1, 5.4,2, 3, 0, '#5FE7EF', this.textureBlue),
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
    }

    drawRoom() {
        this.shapes.push(
            // Bottom
            new Circle(-1, 6,10, 10, 0, '#FCC5DD'),
            new Eight(-1, 7,3, 2, -40, '#6500FF'),
            new Circle(1, 7.5,4, 3.5, 0, '#FE6A7A'),
            new OutGrowth(0, 7.5,2, 2, 30, '#FFE202'),
            new Eight(-2, 8,6, 3, 20, '#6500FF', this.texturePurple),
            new Eight(3, 8,5, 3, 80, '#5FE7EF'),
            new OutGrowth(4.6, 5.2,2.2, 3.4, 0, '#FFFDDF', this.textureWhite),
            new Circle(-1, 5.4,2, 3, 0, '#5FE7EF', this.textureBlue),
            new OutGrowth(3, 8.2,1.6, 1.4, 45, '#FFE202'),
            new OutGrowth(-1, 9,1.6, 1.4, 0, '#FFE202'),
            new Circle(1, 9,0.7, 0.7, 0, '#5FE7EF'),
        )

        // Bottom
        new Star(4.2,8, 10, 0.2,0.1,0, '#6500FF')
        new Star(2.5,10, 10, 0.3,0.15,0, '#FCC5DD')
        new Star(1.6,7.6, 10, 0.5,0.25,0, '#5FE7EF')

        // Mask
        new Rect(0,7.5,6,4)
    }

    drawTheme(path) {
        this.shapes.push(
            // Top
            new Eight(4.8, 0.5,3.4, 2.5,-60,'#6500FF'),
            new Eight(-2, 1.9,4, 2,-60,'#FE6A7A'),
            new OutGrowth(-0.5, 2,1.5, 1.5,-10,'#5FE7EF', this.textureBlue),
            new Circle(-0.2, 1,0.8, 0.8,0,'#6500FF'),
            new Circle(1, 0.2,0.4, 0.4,0,'#FE6A7A'),
            new Circle(5.6, 2,0.6, 0.6,0,'#FCC5DD'),

            // Bottom
            new OutGrowth(-0.8, 5.4,2, 2,-80,'#6500FF', this.texturePurple),
            new Eight(-1, 6.8,4.5, 1.2,10,'#FCC5DD'),
            new OutGrowth(-0.2, 6.4,1, 1,10,'#FFE202'),
            new Circle(1.4, 6.8,0.4, 0.4,0,'#5FE7EF'),
            new OutGrowth(4.8, 5.8,3.2, 2.5,100,'#5FE7EF'),
            new Circle(5.8, 6.4,0.4, 0.4,0,'#FFE202'),
            new Circle(5.4, 6.8,1, 1,0,'#FFFDDF'),
            new Circle(5.6, 9,0.5, 0.5,0,'#FE6A7A'),
        )

        // Top
        new Star(0.6,0.5, 10, 0.2,0.1,0, '#FFE202')
        new Star(1.4,0.6, 4, 0.18,0.04,0, '#5FE7EF')
        new Star(5,1, 10, 0.3,0.15,0, '#5FE7EF')
        new Star(1.4,2.1, 10, 0.2,0.1,0, '#FFFDDF')
        new Star(5.6,3, 10, 0.4,0.2,0, '#FFE202')

        // Bottom
        new Star(0.5,5.8, 10, 0.3,0.15,0, '#FFFDDF')
        new Star(1.4,6.8, 4, 0.18,0.04,0, '#FFFDDF')
        new Star(5.5,6, 10, 0.2,0.1,0, '#FE6A7A')
        new Star(1,8.8, 10, 0.1,0.05,0, '#FFE202')
        new Star(0.5,9.5, 10, 0.3,0.15,0, '#5FE7EF')
        new Star(5,9, 4, 0.2,0.05,0, '#FFFDDF')

        new Img(1,2.6, path + '1.png')
        new Img(4.7,2.4, path + '2.png')
        new Img(1.2,6.2, path + '3.png')
        new Img(5,6.8, path + '4.png')
        new Img(3,7, path + '5.png')
    }

    drawGame() {
        this.shapes.push(
            // Middle
            new Circle(3, 2, 7, 7, 0, '#FCC5DD'),
            new Circle(-1, 2, 7, 7, 0, '#FCC5DD'),
            new OutGrowth(3.4, 5.4,1.2, 1, -45, '#5FE7EF'),
            new Circle(-1, 3,4, 5, 0, '#5FE7EF'),
            new Circle(-1, 6,4, 5, 0, '#FE6A7A'),
            new OutGrowth(-1, 4.3,2, 2, 0, '#FFE202'),
            new Eight(-1, 3.3,3, 2, 0, '#FFFDDF', this.textureWhite),
            new Circle(3, 3,2, 2, -100, '#FFE202'),
            new Eight(4, 3.3,3, 2, 80, '#6500FF', this.texturePurple),
            new Circle(3.4, 3.6,1.2, 1, 0, '#5FE7EF'),


            // Bottom
            new Circle(-1, 6,10, 10, 0, '#6500FF'),
            new Circle(1, 7.5,4, 3.5, 0, '#FE6A7A'),
            new OutGrowth(0, 7.5,2, 2, 30, '#FFE202'),
            new Eight(-2, 8,6, 3, 20, '#6500FF', this.texturePurple),
            new Eight(3, 8,5, 3, 80, '#5FE7EF'),
            new OutGrowth(4.6, 5.2,2.2, 3.4, 0, '#FFFDDF', this.textureWhite),
            new Circle(-1, 5.4,2, 3, 0, '#5FE7EF', this.textureBlue),
            new OutGrowth(3, 8.2,1.6, 1.4, 45, '#FFE202'),
            new OutGrowth(-1, 9,1.6, 1.4, 0, '#FFE202'),
            new Circle(1, 9,0.7, 0.7, 0, '#5FE7EF'),
        )

        // Middle
        new Star(4.8,6, 10, 0.5,0.25,0, '#FE6A7A')
        new Star(1.4,5.2, 10, 0.5,0.25,0, '#6500FF')
        new Star(2.2,5.6, 10, 0.2,0.1,0, '#FCC5DD')

        // Bottom
        new Star(4.2,8, 10, 0.2,0.1,0, '#6500FF')
        new Star(2.5,10, 10, 0.3,0.15,0, '#FCC5DD')
        new Star(1.6,7.6, 10, 0.5,0.25,0, '#5FE7EF')

        // Mask
        new Rect(0,3.5,6,8)
    }

    drawWinner() {
        this.shapes.push(
            // Top
            new Eight(4.8, 2,3.4, 2.5,-60,'#6500FF'),
            new Eight(-2, 2.9,4, 2,-60,'#FE6A7A'),
            new OutGrowth(-0.5, 3,1.5, 1.5,-10,'#5FE7EF', this.textureBlue),
            new Circle(-0.2, 1.5,0.8, 0.8,0,'#6500FF'),
            new Circle(1, 0.2,0.4, 0.4,0,'#FE6A7A'),
            new Circle(5.6, 3,0.6, 0.6,0,'#FCC5DD'),

            // Bottom
            new OutGrowth(5.2, 3.6,3.2, 2.5,100,'#5FE7EF'),
            new Circle(5.8, 4.4,0.4, 0.4,0,'#FFE202'),
            new Circle(5.7, 4.6,1, 1,0,'#FFFDDF'),
            new Circle(5.6, 9,0.5, 0.5,0,'#FE6A7A'),
        )

        // Top
        new Star(0.6,0.5, 10, 0.2,0.1,0, '#FFE202')
        new Star(1.4,0.6, 4, 0.18,0.04,0, '#5FE7EF')
        new Star(5,1, 10, 0.3,0.15,0, '#5FE7EF')
        new Star(1,3.4, 10, 0.2,0.1,0, '#FFFDDF')
        new Star(5.6,3, 10, 0.4,0.2,0, '#FFE202')

        // Bottom
        new Star(0.5,5.8, 10, 0.3,0.15,0, '#FFFDDF')
        new Star(5.6,5.6, 10, 0.2,0.1,0, '#FE6A7A')
        new Star(1,8.8, 10, 0.1,0.05,0, '#FFE202')
        new Star(0.5,9.5, 10, 0.3,0.15,0, '#5FE7EF')
        new Star(5,9, 4, 0.2,0.05,0, '#FFFDDF')
    }

    drawDefeat() {
        this.shapes.push(
            // Top
            new Eight(4.8, 0.5,3.4, 2.5,-60,'#6500FF'),
            new Eight(-2, 1.9,4, 2,-60,'#FE6A7A'),
            new OutGrowth(-0.5, 2,1.5, 1.5,-10,'#5FE7EF', this.textureBlue),
            new Circle(-0.2, 1,0.8, 0.8,0,'#6500FF'),
            new Circle(1, 0.2,0.4, 0.4,0,'#FE6A7A'),
            new Circle(5.6, 2,0.6, 0.6,0,'#FCC5DD'),

            // Bottom
            new OutGrowth(-0.8, 5.4,2, 2,-80,'#6500FF', this.texturePurple),
            new Eight(-1, 6.8,4.5, 1.2,10,'#FCC5DD'),
            new OutGrowth(-0.2, 6.4,1, 1,10,'#FFE202'),
            new Circle(1.4, 6.8,0.4, 0.4,0,'#5FE7EF'),
            new OutGrowth(4.8, 5.8,3.2, 2.5,100,'#5FE7EF'),
            new Circle(5.8, 6.4,0.4, 0.4,0,'#FFE202'),
            new Circle(5.4, 6.8,1, 1,0,'#FFFDDF'),
            new Circle(5.6, 9,0.5, 0.5,0,'#FE6A7A'),
        )

        // Top
        new Star(0.6,0.5, 10, 0.2,0.1,0, '#FFE202')
        new Star(1.4,0.6, 4, 0.18,0.04,0, '#5FE7EF')
        new Star(5,1, 10, 0.3,0.15,0, '#5FE7EF')
        new Star(1.4,2.1, 10, 0.2,0.1,0, '#FFFDDF')
        new Star(5.6,3, 10, 0.4,0.2,0, '#FFE202')

        // Bottom
        new Star(0.5,5.8, 10, 0.3,0.15,0, '#FFFDDF')
        new Star(1.4,6.8, 4, 0.18,0.04,0, '#FFFDDF')
        new Star(5.5,6, 10, 0.2,0.1,0, '#FE6A7A')
        new Star(1,8.8, 10, 0.1,0.05,0, '#FFE202')
        new Star(0.5,9.5, 10, 0.3,0.15,0, '#5FE7EF')
        new Star(5,9, 4, 0.2,0.05,0, '#FFFDDF')
    }

    drawLogin() {
        const avatar = new Avatar(3, 3.5, 2, Math.floor((Math.random() * 15)))
        this.avatars.push(avatar)
    }

    getShapes() {
        return this.shapes
    }

    getAvatars() {
        return this.avatars
    }
}
