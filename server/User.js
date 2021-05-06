class User {
    constructor(name, id, avatar) {
        this.vars(name, id, avatar)
    }

    vars(name, id, avatar) {
        this.name = name
        this.id = id
        this.avatar = avatar.src
    }
}

module.exports = {
    User
}
