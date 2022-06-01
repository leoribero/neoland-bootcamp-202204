const { User } = require('../models')
const { ConflictError } = require('../errors')
const { validateStringNotEmptyOrBlank, validateUsername, validatePassword } = require('../validators')

function registerUser(name, username, password) {
    validateStringNotEmptyOrBlank(name, 'name')
    validateUsername(username)
    validatePassword(password)

    return User.create({ name, username, password })
        .then(() => { })
        .catch(error => {
            if (error.code = 11000)
                throw new ConflictError(`user with username ${username} already exists`)
            
            throw error
        })
}

module.exports = registerUser