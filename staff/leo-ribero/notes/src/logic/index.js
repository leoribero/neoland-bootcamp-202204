const registerUser = require('./registerUser')
const authenticateUser = require('./authenticateUser')
const retrieveUser = require('./retrieveUser')
const retrieveNotes = require('./retrieveNotes')
const updateUser = require('./updateUser')
const createNote = require('./createNote')
const updateNote = require('./updateNote')

module.exports = {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    createNote,
    updateNote,
    retrieveNotes
}