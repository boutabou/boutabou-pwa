class Task {
    constructor(idUser, interaction) {
        this.vars(idUser, interaction)
        this.initTask()
    }

    vars(idUser, interaction) {
        this.idUser = idUser
        this.name = interaction.data.title
        this.type = interaction.type
        this.status = interaction.status
        this.param = interaction.data.param
        this.request = ''
        this.sentence = ''
    }

    initTask() {
        switch (this.type) {
            case 'bool':
                if (this.status && this.status === "off") {
                    this.sentence = "Désactiver la " + this.name
                    this.request = "off"
                } else {
                    this.sentence = "Activer la " + this.name
                    this.request = "on"
                }
                break
            case 'simple-list':
                const paramSimple = this.param
                this.sentence = "Enclencher le " + this.name + " " + paramSimple
                this.request = paramSimple
                break
            case 'complex-list':
                const param = this.param[this.getRandomIndex(this.param)]
                this.sentence = "Enclencher le " + this.name + " " + param
                this.request = param
                break
            case 'simple-cursor':
            case 'complex-cursor':
            case 'rotate':
                let step = this.param[this.getRandomIndex(this.param)]

                while (this.status === step) {
                    step = this.param[this.getRandomIndex(this.param)]
                }

                this.sentence = "Mettre le " + this.name + " sur " + step
                this.request = step.toString()
                break
        }

        this.name = this.name.replace(/\W/g,'_').toLowerCase()
        this.request = this.request.replace(/\W/g,'_').toLowerCase()
    }

    getRandomIndex(tab) {
        return Math.floor((Math.random() * tab.length))
    }
}

module.exports = {
    Task
}
