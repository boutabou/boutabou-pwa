class Task {
    constructor(idUser, name, type, status, sentence, request) {
        this.vars(idUser, name, type, status, sentence, request)
    }

    vars(idUser, name, type, status, sentence, request) {
        this.idUser = idUser
        this.name = name
        this.request = request
        this.type = type
        this.sentence = sentence
        this.status = status
        this.timer = 12000
    }

}

module.exports = {
    Task,
}
