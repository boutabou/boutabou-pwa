import ScanQrCode from './ScanQrCode'
import Login from './Login'
import Room from './Room'

export default class BlockList {
    constructor(socket) {
        new ScanQrCode(document.querySelector('.js-scan'), socket)
        new Login(document.querySelector('.js-login'), socket)
        new Room(document.querySelector('.js-list-users'), socket)
    }
}
