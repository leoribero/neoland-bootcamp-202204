const { validateStringNotEmptyNoSpaces, validateFunction } = require('../validators')
const { access, readdir, readFile } = require('fs')
const { NotFoundError } = require('../errors')

function retrieveNotes(userId, callback) {
    validateStringNotEmptyNoSpaces(userId)
    validateFunction(callback, 'callback')

    access(`./db/users/${userId}.json`, error => {
        if (error) return callback(new NotFoundError(`user with id ${userId} not found`))

        readdir('./db/notes', (error, files) => {
            if (error) return callback(error)

            const notes = []

            if (!files.length)
                callback(null, notes)
            else {
                let count = 0, _error

                files.forEach(file => {
                    readFile(`./db/notes/${file}`, 'utf8', (error, json) => {
                        if (!_error) {
                            if (error) return callback(_error = error)

                            count++

                            const note = JSON.parse(json)

                            note.date = new Date(note.date)

                            if (note.user === userId)
                                notes.push(note)

                            if (count === files.length)
                                callback(null, notes)
                        }
                    })
                })
            }

        })
    })
}

module.exports = retrieveNotes