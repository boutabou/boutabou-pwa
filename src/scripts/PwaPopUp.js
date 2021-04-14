export default class PwaPopUp {
    constructor() {
        this.initEls()
        this.initPopUp()
    }

    initEls() {
        // Detects if device is on iOS 
        this.isIos = () => {
            const userAgent = window.navigator.userAgent.toLowerCase()
            return /iphone|ipad|ipod/.test( userAgent )
        }
        // Detects if device is in standalone mode
        this.isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone)
    }

    initPopUp() {
        // Checks if should display install popup notification:
        if (this.isIos() && this.isInStandaloneMode) {
            document.body.innerHTML = "<div id='popup'><div class='popup-close-icon'>&times;</div><h4>Add Our App?</h4><p>Tap below to add an icon to your home screen for quick access!</p></div>"
        }
    }
}
