const { User } = require('../models')
const { AuthError } = require('../errors')
const { validateObjectId, validatePassword } = require('../validators')

function deleteUser(userId, password) {
    validateObjectId(userId)
    validatePassword(password)

    return User.findById(userId)
        .then(result => {
            if (result === null) throw new AuthError('incorrect Id')

            if(result.password !== password) throw new AuthError('wrong credentials')

            return User.deleteOne({_id: userId})
        })
        .then(() => {})
}
module.exports = deleteUser