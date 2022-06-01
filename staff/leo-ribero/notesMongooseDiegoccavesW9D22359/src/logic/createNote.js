const { User, Note } = require('../models')
const { NotFoundError } = require('../errors')
const {  validateObjectId, validateString } = require('../validators')

function createNote(userId, text) {
    validateObjectId(userId)
    if (text != null)  validateString(text, 'text')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

            return Note.create({ user: userId, text })
        })
        .then(note => note.id)
}

module.exports = createNote