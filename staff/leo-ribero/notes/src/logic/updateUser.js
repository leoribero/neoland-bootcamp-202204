const { User } = require('../models')
const { NotFoundError } = require('../errors')

function updateUser(userId, name, age, email, phone) {
    // TODO validate input args

    return User.updateOne({ _id: userId }, { $set: { name, age, email, phone }})
        .then(result => {
            if (result.matchedCount === 0)
                throw new NotFoundError(`user with id ${userId} does not exist`)
        })
}

module.exports = updateUser