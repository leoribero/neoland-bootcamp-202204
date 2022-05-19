// ts1206s7d3 cambios para pasar a NODE desde REACT
// PARA IMPORTAR ahora es con require()
//import createCustomError from '../utils/createCustomError'
const createCustomError = require('../utils/createCustomError')


const FormatError = createCustomError('FormatError')
const AuthError = createCustomError('AuthError')

// export {
//     FormatError,
//     AuthError
// }
// ts1206s7d3 cambios para pasar a NODE desde REACT
// PARA EXPORTAR ahora es con module.exports = {}

module.exports = {
        FormatError,
        AuthError
    }