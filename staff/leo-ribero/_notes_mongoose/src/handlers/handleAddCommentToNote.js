const { addCommentToNote} = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = (req, res) => {
    try {
        const userId = verifyToken(req)

        const { params: { noteId }, body: { text }  } = req

        addCommentToNote(userId, noteId, text)
            .then(noteId => res.status(201).json({ noteId }))
            .catch(error => handleErrorsAndRespond(error, res))
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}