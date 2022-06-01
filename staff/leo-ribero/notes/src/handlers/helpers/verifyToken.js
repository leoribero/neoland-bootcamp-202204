const { verify } = require('jsonwebtoken')
const { AuthError } = require('../../errors')

/**
* Parses JWT from Express Request, verifies it (against the secret) and returns the payload.
* 
* @param {Request} req The HTTP request (Express server)
* 
* @retuns {String} userId The user id
*/
function verifyToken(req) {
    const { headers: { authorization } } = req

    if (!authorization)
        throw new AuthError('no authorization header received (with token)')

    const [, token] = authorization.split(' ')

    const { sub: userId } = verify(token, process.env.JWT_SECRET)

    return userId
}

module.exports = verifyToken