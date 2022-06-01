const registerUser = require('./registerUser')
const authenticateUser = require('./authenticateUser')
const retrieveUser = require('./retrieveUser')
const updateUser = require('./updateUser')
const deleteUser = require('./deleteUser')
const createNote = require('./createNote')
const retrieveNote = require('./retrieveNote')
const updateNote = require('./updateNote')
const deleteNote = require('./deleteNote')
const addCommentToNote = require('./addCommentToNote')
const deleteCommentFromNote = require('./deleteCommentFromNote')


module.exports = {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    deleteUser,
    createNote,
    retrieveNote,
    updateNote,
    deleteNote,
    addCommentToNote,
    deleteCommentFromNote

}