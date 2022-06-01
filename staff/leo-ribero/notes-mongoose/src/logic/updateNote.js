const { User, Note } = require('../models')
const { note } = require('../models/schemas')
const {NotFoundError} = require('../errors')


function updateNote(noteId, userId, text) { debugger
    //TODO validate input args

    return Note.findById(noteId)
        .then(note => { debugger
            if (!note) throw new NotFoundError(`note with id ${noteId} does not exist`)

            console.log(note.text, 4545545)
            note.text = text
            
            return note.save()
        })
        
        .then(() => { }) // devolvemos una promesa que contenga un objeto que podría ser un objeto con cosas

        // .then(user => {
        //     if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

        //     return Note.create({ user: userId, text })
        // })
        // .then(note => note.id)


    }
module.exports = updateNote