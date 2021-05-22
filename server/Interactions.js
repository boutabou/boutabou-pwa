class Interactions {
    constructor(sockets) {
        this.vars(sockets)
        this.bindMethods()
        this.listenStatus()
    }

    vars(sockets) {
        this.sockets = sockets
        this.all = []
    }

    bindMethods() {
        this.changeStatus = this.changeStatus.bind(this)
    }

    addNew(interaction) {
        this.initStatus(interaction)
        this.all.push(interaction)
    }

    initStatus(interaction) {
        switch (interaction.type) {
            case 'bool':
                interaction.status = 'on'
                break
            case 'simple-cursor':
            case 'complex-cursor':
            case 'rotate':
                interaction.status = interaction.data.param[0]
                break
        }
    }

    listenStatus() {
        this.sockets.forEach((socket) => {
            socket.on('interaction:activated', this.changeStatus)
        })
    }

    changeStatus(userAction) {
        this.all.forEach((interaction) => {
            if(interaction.data.title.replace(/\W/g,'_').toLowerCase() === userAction.element.name) {
                switch (interaction.type) {
                    case 'bool':
                        if (interaction.status === 'on') {
                            interaction.status = 'off'
                        } else {
                            interaction.status = 'on'
                        }
                        break
                    case 'simple-cursor':
                    case 'complex-cursor':
                    case 'rotate':
                        interaction.status = userAction.actionMake
                }
            }
        })
    }
}

module.exports = {
    Interactions
}
