const { User } = require('../models')
const { NotFoundError } = require('../errors')

function retrieveUser(userId) {
    // TODO validate input args

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            const doc = user._doc // {_id: ObjectId, name: 'Papa Gayo', username: 'papagayo', password: '123123123', __v: 0}

            delete doc._id
            delete doc.__v
            delete doc.password

            return doc
        })
}

module.exports = retrieveUser