const { validateStringNotEmptyOrBlank, validateUsername, validatePassword } = require('../validators')

/**
 * Constructs instances of User
 * 
 * @param {string} name The name of the user
 * @param {string} username The user username
 * @param {string} password The user password
 */
 function User(name, username, password) {
    validateStringNotEmptyOrBlank(name, 'name')
    validateUsername(username)
    validatePassword(password)

    this.name = name
    this.username = username
    this.password = password
}

module.exports = User