const { connect, disconnect } = require('mongoose')
const { User, Note } = require('../models')
const updateNote = require('./updateNote')
const { expect } = require('chai')
const { NotFoundError } = require('../errors')
const { ObjectId } = require('bson')
const { note } = require('../models/schemas')

describe('updateNote', () => {
    before(() => connect('mongodb://127.0.0.1:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    describe('when user exists', () => {
        let userId

        beforeEach(() => {
            return User.create({ name: 'Diego Carvalho', username: 'diegocarva', password: '1234' })
                .then(user => {
                    userId = user.id
                })
        })

        it('succeeds notes and correct credentials', () => {
            let noteId

            return Note.create({ user: userId, text: 'Oi flor' })
                .then((result) => {
                    noteId = result.id
             
                    return updateNote(userId, noteId, 'Olá mundo')
                })
                .then((result) => {
                    expect(result).to.be.undefined

                    return Note.findById(noteId)
                })
                .then((note) => {
                    expect(note.text).to.be.equal('Olá mundo')
                })
        })

        it ('fails with no notes', () => {
            const wrongId = new ObjectId().toString()

            return updateNote(userId, wrongId, 'Olá mundo')
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`note with id ${wrongId} does not exist`)
                })
        })
    })


    afterEach(() => User.deleteMany())
    after(() => disconnect())

})



