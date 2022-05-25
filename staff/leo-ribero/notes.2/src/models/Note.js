const createId = require('../utils/createId')

function Note(id, text, date) {
    if (id != null && typeof id !== 'string') throw new TypeError('id is not a string')
    if (text != null && typeof text !== 'string') throw new TypeError('text is not a string')
    if (date != null && !(date instanceof Date)) throw new TypeError('date is not Date')

    this.id = id || createId()
    this.text = text
    this.date = date || new Date
}

module.exports = Note