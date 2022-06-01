const { User } = require('../models')
const { AuthError } = require('../errors')
const { validateUsername, validatePassword } = require('../validators')

function authenticateUser(username, password) {
    validateUsername(username)
    validatePassword(password)

    return User.findOne({ username, password })
        .then(user => {
            if (!user)
                throw new AuthError('wrong credentials')

            return user.id
        })
}

module.exports = authenticateUser