export default class PwaPopUp {
    constructor() {
        this.initEls()
        this.initEvents()
    }

    initEls() {
        this._beforeInstallPrompt
    }

    initEvents() {
        if ( "onbeforeinstallprompt" in window ) {
            window.addEventListener( "beforeinstallprompt", this.beforeInstallPrompt )
        }
    }

    beforeInstallPrompt( evt ) {
        evt.preventDefault()
        this._beforeInstallPrompt = evt
        return  this._beforeInstallPrompt.prompt()
            .then( function ( evt ) {
                // Wait for the user to respond to the prompt
                return  this._beforeInstallPrompt.userChoice
            })
            .then( function ( choiceResult ) {})
            .catch( function ( err ) {
                if ( err.message.indexOf( "user gesture" ) > -1 ) {
                }
                else if ( err.message.indexOf( "The app is already installed" ) > -1 ) {
                } else {
                    return err
                }
            })
    }

}
