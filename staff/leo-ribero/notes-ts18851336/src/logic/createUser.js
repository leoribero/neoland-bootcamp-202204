const { validateStringNotEmptyOrBlank, validateUsername, validatePassword, validateFunction } = require('../validators')
const { readdir, readFile, writeFile } = require('fs')
const { ConflictError } = require('../errors')
const { User } = require('../models')
const { createId } = require('../utils')

function createUser(name, username, password, callback) {
    validateStringNotEmptyOrBlank(name, 'name')
    validateUsername(username)
    validatePassword(password)
    validateFunction(callback, 'callback')

    readdir('./db/users', (error, files) => {
        debugger
        if (error) return callback(error)

        let count = 0, _error

        if (files.length)
            files.forEach(file => {
                readFile(`./db/users/${file}`, 'utf8', (error, json) => {
                    if (!_error) {
                        if (error) return callback(_error = error)
                        
                        count++

                        const user = JSON.parse(json)

                        if (user.username === username)
                            return callback(_error = new ConflictError(`username ${username} already exists`))

                        if (count === files.length) {
                            const user = new User(name, username, password)

                            const json = JSON.stringify(user, null, 4)

                            const userId = createId()

                            writeFile(`./db/users/${userId}.json`, json, error => {
                                if (error) return callback(error)

                                callback(null, userId)
                            })
                        }
                    }
                })
            })
        else {
            const user = new User(name, username, password)

            const json = JSON.stringify(user, null, 4)

            const userId = createId()

            writeFile(`./db/users/${userId}.json`, json, error => {
                if (error) return callback(error)

                callback(null, userId)
            })
        }
    })
}

module.exports = createUser