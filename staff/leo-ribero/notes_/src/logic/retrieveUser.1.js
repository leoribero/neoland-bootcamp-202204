// se basa en registerUser
const { User } = require('../models')
const { NotFoundError } = require('../errors')

function retrieveUser(userId)   {
    //recibo un userId para luego buscar ese usuario
    // TODO validate input args

    return User.findById(userId).lean()    // empiezo con las promesas a través de findById, esto es mongoose,
        .then(user => { //devuelve el usuario, si lo encuentra. si no…
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)
            delete user._id
            delete user.__v
            delete user.password

            return user
        })
}

module.exports = retrieveUser