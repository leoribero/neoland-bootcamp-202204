const { connect, disconnect } = require('mongoose')
const { User } = require('../models')
const { AuthError } = require('../errors')
const authenticateUser = require('./authenticateUser')
const { expect } = require('chai')

describe('authenticateUser', () => {
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

        it('succeeds on correct credentials', () =>
            authenticateUser('pepagaya', '123123123')
            .then(userId => { //como el usuario existe, debería ir todo bien y devolvernos el userId que es el mismo al usuario test que hemos creado
                expect(userId).to.be.a('string')
                expect(userId).to.be.equal(user.id)
            })
        )    

        it('fails on incorrect password', () =>
            authenticateUser('pepagaya', '123_wrong')// aquí, al ser un error, espero que salte directo al catch, aunque ponga un then a efectos de comprobación por si hay un error en el código
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(AuthError)
                    expect(error.message).to.equal('wrong credentials')
                })
        )

        it('fails on incorrect username', () =>
            authenticateUser('pepagaya_wrong', '12312323')// aquí, al ser un error, espero que salte directo al catch, aunque ponga un then a efectos de comprobación por si hay un error en el código
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(AuthError)
                    expect(error.message).to.equal('wrong credentials')
                })
        )
    })

    describe('when user does not exist', () => {
        it('fails on credentials from non-existing user ', () =>
            authenticateUser('pepagaya', '123123123')// aquí, al ser un error, espero que salte directo al catch, aunque ponga un then a efectos de comprobación por si hay un error en el código
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(AuthError)
                    expect(error.message).to.equal('wrong credentials')
                })
        )

    })

    afterEach(() => User.deleteMany())

    after(() => disconnect())

})