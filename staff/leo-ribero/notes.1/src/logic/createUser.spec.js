const fs = require('fs')
const createUser = require('./createUser')

describe('createUser', done => {
    it('succeeds on new user and correct user data', done => {
        createUser('John Doe', 'johndoe', 123123123, (error, userId) => {
            // si algo ha ido mal, en el proceso del disco, por ejemplo, error. Y si no, userId
            expect(error), to.be.null
            //esto es Mocha a diferencia de lo que teniamos

            expect(userId).to.be.a('string')
            //esto es

            //aquí, para continuar, verificamos si el usuario existe mediante fs
            // https://nodejs.org/api/fs.html
            // https://nodejs.org/api/fs.html#fsaccesspath-mode-callback
            // ts1147s7d3 de esta forma comprueba si el archivo existe y si no da un error
            fs.acces(`.db/user/${userId}`, fs.constants.F_OK, error => {
                expect(error).to.be.null

                // ts1151s7d3 tenemos que leer si el contenido del archivo
                fs.readFile(file, 'utf8', (error, content) => {
                    expect(error).to.be.null
                    expect(json).to.be.a('string')

                    const user = JSON.parse(json)
                    expect(user.name).to.equal('John Doe')
                    expect(user.username).to.equal('johndoe')
                    expect(user.password).to.equal('123123123')
                    // ts1154s7d3 todo esto es asincrono. No sabemos cuando llegará cada respuesta. Pero Mocha Chai nos permite decirle al test cuando hemos terminado. De ahí el "done() que es el callback que llamamos en la función  "it"

                    done()
                })

            })
        })
    })
})