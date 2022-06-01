const { NotFoundError } = require("../errors")
const { comment } = require("../models/schemas")
const { index } = require("../models/schemas/user")
const { validateStringNotEmptyNoSpaces } = require("../validators")
const { User, Note} = require('../models')

function deleteCommentFromNote(userId, noteId, commentId) {
    validateStringNotEmptyNoSpaces(userId, 'user id')
    validateStringNotEmptyNoSpaces(noteId, 'note id')
    validateStringNotEmptyNoSpaces(commentId, 'comment id')

    return User.findById(userId)//busco el commenter
        .then((user) => {
            if (!user) throw new NotFoundError(`user id ${userId} does not found`)//lo valido

            return Note.findById(noteId)//busco la nota comentada
        })
        .then((note) => {
            if(!note) throw new NotFoundError(`note id ${noteId} does not found`)//la valido

            const index = note.comments.findIndex(comment => comment.id === commentId)//uso lo metodo findIndex para buscar el id del comentário que que queremos dentro del array de comments. 
            if (index === -1) throw new NotFoundError(`comment with id ${commentId} not found`)//si no lo encontra, nos devolve -1, lo que significa que no he encontrado el id del comentário y nos devolve un mensage de error.

            note.comments.splice(index, 1)//si lo encontramos(el id del comentário), entán lo eliminamos usando el metódo splice.
            return note.save()//salvamos lo  cambio.
                .then(() => { })//devolvemos un array vacio.

        })

}

module.exports = deleteCommentFromNote