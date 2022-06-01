const { User, Note } = require('../models')
const{validateStringNotEmptyNoSpaces, validateString } = require('../validators')
const { NotFoundError } = require('../errors')

function updateNote(userId, noteId, text) {
    validateStringNotEmptyNoSpaces(userId, 'user id')
    validateStringNotEmptyNoSpaces(noteId, 'note id')
    if(text != null) validateString(text, 'text')

    return User.findById(userId)
    .then((user) => {
        if(!user) throw new NotFoundError(`${userId} does not exist`) 

        return Note.findById(noteId).lean()
    })
    .then((note) => {
        if(!note) throw new NotFoundError(`note with id ${noteId} does not exist`) 

        return Note.updateOne({_id: noteId, user: userId},{$set: {text}})
    })
    .then(() => { })
    
}

module.exports = updateNote