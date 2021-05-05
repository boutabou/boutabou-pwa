class Task {
    constructor(idUser, name, type, status, param) {
        this.vars(idUser, name, type, status, param)
        this.initTask()
    }

    vars(idUser, name, type, status, param) {
        this.idUser = idUser
        this.name = name
        this.type = type
        this.status = status
        this.param = param
        this.request = ''
        this.sentence = ''
        this.timer = 12000
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
