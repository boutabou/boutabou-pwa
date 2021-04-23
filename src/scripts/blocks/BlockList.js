import ScanQrCode from './ScanQrCode'
import Login from './Login'
import Room from './Room'
import Theme from './Theme'

export default class BlockList {
    constructor(socket, swup) {
        new ScanQrCode(document.querySelector('.js-scan'), socket, swup)
        new Login(document.querySelector('.js-login'), socket, swup)
        new Room(document.querySelector('.js-list-users'), socket, swup)
        new Theme(document.querySelector('.js-theme'), socket, swup)
    }
}
