const { User } = require('../models')

function updateUser(id, newName) {
    // TODO validate input args

    return User.updateOne({_id: id}, {$set:{name: newName}})
    
        .then(() => { })
        .catch(error => {
            if (error) throw new error
        })
}

module.exports = updateUser