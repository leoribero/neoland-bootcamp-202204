const { validateStringNotEmptyOrBlank, validateString, validateDate } = require('../validators')

function Note(id = createId(), user, text, date = new Date) {
    validateStringNotEmptyOrBlank(id, 'note id')
    validateStringNotEmptyOrBlank(user, 'user id')
    validateString(text, 'text')
    validateDate(date)

    this.id = id
    this.user = user
    this.text = text
    this.date = date
}

module.exports = Note