import ScanQrCode from './ScanQrCode'
import Login from './Login'
import Room from './Room'
import Theme from './Theme'

export default class BlockList {
    constructor(socket, swup) {
        new ScanQrCode('.js-scan', socket, swup)
        new Login('.js-login', socket, swup)
        new Room('.js-list-users', socket, swup)
        new Theme('.js-theme', socket, swup)
    }
}
