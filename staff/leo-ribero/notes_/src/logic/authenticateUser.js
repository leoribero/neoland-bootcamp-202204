const { User } = require('../models')
const { AuthError } = require('../errors')

function authenticateUser(username, password) {
    // Aquí llamamos a nuestra lógica que esta en spec.js. Allí,
    // en el spec, se concatena con el siguiente .then (allí en spec),
    // que luego se concatena con el then de aquí despues del return (que lo que hace es esperar hasta que se resuelva o no algo)
    // entonces .then, que a su vez es otra promesa que se concatena con lo que devuelve la anterior

    // TODO validate input args

    return User.findOne({ username, password })
        .then(user => {
            if (!user)
                throw new AuthError('wrong credentials')

            return user.id
        })// en el return, nos esperamos, cuando termina 
}

module.exports = authenticateUser  
