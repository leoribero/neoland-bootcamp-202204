const { retrieveUser } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')


module.exports = (req, res) => {
    try {
        const userId = verifyToken(req)

        retrieveUser(userId)
            .then(user => res.status(200).json(user))
            .catch(error => handleErrorsAndRespond(error, res))
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}