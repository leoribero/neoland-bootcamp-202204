const { sign } = require('jsonwebtoken')

function generateToken(userId) {
    const token = sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: '1h' })

    return token
}

module.exports = generateToken