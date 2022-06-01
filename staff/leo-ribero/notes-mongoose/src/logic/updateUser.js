const { User } = require('../models')
const { NotFoundError } = require('../errors')
const { validateStringNotEmptyOrBlank, validateStringNotEmptyNoSpaces, validateEmail, validatePositiveInteger, validateString } = require('../validators')

function updateUser(userId, name, age, email, phone) {
    // TODO validate input args
    validateStringNotEmptyNoSpaces(userId, 'user id')
    validateStringNotEmptyOrBlank(name, 'name')
    if (age !=null) validatePositiveInteger(age, 'age')
    if (email != null) validateString(email, 'email')
    if (phone != null) validateString(phone, 'phone')
    // TODO validate input args


    return User.updateOne({ _id: userId }, { $set: { name, age, email, phone }})
        .then(result => {
            if (result.matchedCount === 0)
                throw new NotFoundError(`user with id ${userId} does not exist`)
        })
}

module.exports = updateUser