const deleteFiles = require('./deleteFiles')

deleteFiles('./db/notes', error => {
    console.log(error)
})