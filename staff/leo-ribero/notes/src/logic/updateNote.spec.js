const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Note } = require('../models')
const { NotFoundError } = require('../errors')
const updateNote = require('./updateNote')
const { expect } = require('chai')


describe('updateNote', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    describe('when user already exists', () => {
        let user, note

        // CADA beforeEach crea un escenario
        beforeEach(() => { // antes de que cada uno haga lo que tiene que hacer, creara un usuario nuevo con sus datos
            user = new User({ name: 'Papa Gayo', username: 'papagayo', password: '123123123' })

            return user.save() //retornamos una promesa (creada cuando creamos al usuario)
                .then(() => { //dentro de este escenario creado en el beforeEach, es una nueva promes
                    note = new Note({ user: user.id, text: 'note test update 1' })
                    return note.save() //retornamos una promesa (creada cuando creamos la nota)
                })
        })
        
        it('succeeds on correct user data', () =>
            updateNote( note.id, user.id, 'note test update 2') // aquí es donde estamos haciend el update
                .then(result => {
                    expect(result).to.be.undefined
                    // esperamos que despues que el update nos responda, el texto sea update 2

                    return Note.findById(note.id)// esperamos la nota con esa id
                })
                .then(note => {
                    // expect(note.user.toString()).to.equal(user._id.toString())
                    expect(note.user.toString()).to.equal(user.id)
                    expect(note.text).to.equal('note test update 2')
                    expect(note.date).to.be.instanceOf(Date)
                })
        )

        it('fails on incorrect user id', () => {
            const wrongId = new ObjectId().toString()

            return updateNote(note.id, wrongId, 'texto')
                .then(result => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`user with id ${wrongId} does not exist`)
                })
        })
    })

    // describe('when user does not exist', () => {
    //     it('fails on unexisting user id', () => {
    //         const unexistingUserId = new ObjectId().toString()

    //         return updateNote(unexistingUserId, 'Pepe Gayo', 26, 'pepe@gayo.com', '+34123123123')
    //             .then(result => {
    //                 throw new Error('should not reach this point')
    //             })
    //             .catch(error => {
    //                 expect(error).to.be.instanceOf(NotFoundError)
    //                 expect(error.message).to.equal(`user with id ${unexistingUserId} does not exist`)
    //             })
    //     })
    // })

    afterEach(() => User.deleteMany())

    after(() => disconnect())
})