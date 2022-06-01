const { expect } = require('chai')
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { NotFoundError } = require('../errors')
const { User, Note } = require('../models')
const deleteNote = require('./deleteNote')


describe('deleteNote', () => {
    before(() => connect('mongodb://127.0.0.1:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())
    beforeEach(() => Note.deleteMany())

    describe('when user already exists', () => {
        let userId

        beforeEach(() => {
            return User.create({ name: 'Diego Carvalho', username: 'diegocarva', password: '1234' })
                .then((user) => {
                    userId = user.id

                })
        })

        it('succeeds notes and correct credentials', () => {
            let noteId

            return Note.create({ user: userId, text: 'Oi flor' })
                .then((result) => {
                    noteId = result.id

                    return deleteNote(userId, noteId)
                })
                .then((result) => {
                    expect(result).to.be.undefined

                    return Note.findById(noteId)

                })
                .then((note) => {
                    expect(note).to.be.null
                })
        })

        it('fails when note id does not exist', () => {
            const wrongId = new ObjectId().toString()

            return deleteNote(userId, wrongId)
                .then(() => {
                    throw new Error('it should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`note with id ${wrongId} does not exist`)
                })
        })

    })

    describe('When user does not exist', () => {

        it('fails with wrong user Id', () => {
            const wrongId = new ObjectId().toString()
            const userId = new ObjectId().toString()
        debugger
            let noteId
            return Note.create({ user: userId, text: 'Olá Rubim' })
                .then((result) => {
                    noteId = result.id

                    return deleteNote(wrongId, noteId) // llamo a nuestra funcion
                })
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`user id ${wrongId} does not found`)
                })
        })

    })

    afterEach(() => User.deleteMany())
    after(() => disconnect())
})
