// se basa en registerUser
const { User } = require('../models')
const { NotFoundError } = require('../errors')

function retrieveUser(userId)   {
    //recibo un userId para luego buscar ese usuario
    // TODO validate input args

    return User.findById(userId).lean()    // otra forma de devolver un objeto plano es con el método .lean Devuelve un objeto plano
    // empiezo con las promesas a través de findById, esto es mongoose,
        .then(user => { //devuelve el usuario, si lo encuentra. si no…
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)
                //gracias al .lean solo tengo que empezar a borrar lo que no me interesa
            delete user._id
            delete user.__v
            delete user.password

            return user
        })
}

module.exports = retrieveUser