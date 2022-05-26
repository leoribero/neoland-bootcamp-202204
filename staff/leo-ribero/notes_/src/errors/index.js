const { createCustomError } = require('../utils')

const FormatError = createCustomError('FormatError')
const AuthError = createCustomError('AuthError')
const ConflictError = createCustomError('ConflictError')
const NotFoundError = createCustomError('NotFoundError')

module.exports = {
    FormatError,
    AuthError,
    ConflictError,
    NotFoundError
}