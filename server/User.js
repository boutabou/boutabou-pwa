let avatars = []

class User {
    constructor(name, id) {
        this.vars(name, id)
    }

    vars(name, id) {
        this.name = name
        this.id = id
        this.avatar = this.feedAvatars()
    }

    feedAvatars() {

        if(avatars.length == 0){
            delete require.cache[require.resolve('./data/avatars.json')];
            avatars = require('./data/avatars.json')
        }

        const avatarUserKey = Math.floor((Math.random() * avatars.length))
        const userAvatar    = avatars[avatarUserKey].src
        avatars.splice(avatarUserKey, 1)

        return userAvatar
    }
}

module.exports = {
    User
}
