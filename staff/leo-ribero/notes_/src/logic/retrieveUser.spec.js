const { connect, disconnect, Types: { ObjectId }  } = require('mongoose')
const { User } = require('../models')
const { AuthError } = require('../errors')
const retrieveUser = require('./retrieveUser')
const { expect } = require('chai')

describe('retrieveUser', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    describe('when user already exist', () => {// esto es un SUB-SET que dentro crea un usuario sobre una db vacía
        let user

        beforeEach(() => {//vamos a crear un nuevo usuario cada vez
            user = new User({ name: 'Pepa Gaya', username: 'pepagaya', password: '123123123' })
            return user.save()// retorno la promesa para que se espere. Igual que los then. 
            // Hay que pensar que este callback lo llama internamenten mocha. Lo llama y esto devuelve una promesa. Cuando lo llama
            // el callback devuelve una promesa y se espera a ver que si resuelve o no
        })

        it('succeeds on correct id', () =>
            retrieveUser(user.id)//le pasamos el id de nuestro usuario test 
                // y luego en el then, recibimos el usuario
                .then(user => {//no esperamos que nos devuelva el modelo de datos sino el documento (ver explicación tsw8d30958)
                    //esperamos objeto plano o un modelo nuestro (por seguridad) y limpiando cosas SANEAMIENTO DE DATOS  
                    expect(user.constructor).to.equal(Object) // queremos comprobar que no seá el modelo User y que sea un objteo plano
                    expect(user.name).to.equal('Pepa Gaya')
                    expect(user.username).to.equal('pepagaya')
                    expect(user.password).to.be.undefined
                    expect(user.id).to.be.undefined
                })
        )

        it('fails on incorrect id', () => {
            const wrongId = new ObjectId().toString()

            retrieveUser(wrongId)
                .then(() => {
                    throw new Error('sould not reach this point')
                })
                .catch(error => {
                    expect(error).to.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`user with id ${wrongId} does not exist`)
                })

        })

        describe('when user does not exist', () => {
            it('fails on user id from non-existing user', () => {
                const unexistingUserId = new ObjectId().toString()
    
                retrieveUser(unexistingUserId)
                    .then(() => {
                        throw new Error('sould not reach this point')
                    })
                    .catch(error => {
                        expect(error).to.instanceOf(NotFoundError)
                        expect(error.message).to.equal(`user with id ${unexistingUserId} does not exist`)
                    })
    
            })
        })
    })

    afterEach(() => User.deleteMany())

    after(() => disconnect())
})