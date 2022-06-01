const { NotFoundError } = require("../errors");
const { Note, User} = require("../models");
const { validateStringNotEmptyOrBlank } = require("../validators");


function deleteNote(userId, noteId) {
    validateStringNotEmptyOrBlank(userId, 'user id')
    validateStringNotEmptyOrBlank(noteId, 'note id')

    return User.findById(userId)
    .then((user) => {
        if(!user) throw new NotFoundError(`user id ${userId} does not found`)

        return Note.findById(noteId)
    })
    .then((note) => {
        if(!note) throw new NotFoundError(`note with id ${noteId} does not exist`)

        return Note.deleteOne({_id: noteId, user: userId})
    })
    .then(() => { })
}

module.exports = deleteNote