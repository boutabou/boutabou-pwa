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
        this.sentences = interaction.data.sentences
        this.request = ''
        this.sentence = ''
    }

    initTask() {
        switch (this.type) {
            case 'bool':
                if (this.status && this.status === "off") {
                    this.sentence = this.sentences.off
                    this.request = "off"
                } else {
                    this.sentence = this.sentences.on
                    this.request = "on"
                }
                break
            case 'simple-list':
                this.sentence = this.sentences
                this.request = this.param
                break
            case 'complex-list':
                const index = this.getRandomIndex(this.param)
                this.sentence = this.sentences[index]
                this.request = this.param[index]
                break
            case 'simple-cursor':
            case 'complex-cursor':
            case 'rotate':
                let step = this.param[this.getRandomIndex(this.param)]

                while (this.status === step) {
                    step = this.param[this.getRandomIndex(this.param)]
                }

                this.sentence = this.sentences.replace('{param}',  step.toString())
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
