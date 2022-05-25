const { User } = require('../models')
const { ConflictError } = require('../errors')

function createUser(name, username, password) {
    // TODO validate input args

    return User.create({ name, username, password })
        .then(() => { })
        .catch(error => {
            if (error.code = 11000)
                throw new ConflictError(`user with username ${username} already exists`)
            
            throw error
        })
}

module.exports = createUser