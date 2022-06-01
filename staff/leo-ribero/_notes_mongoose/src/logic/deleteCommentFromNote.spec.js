const { expect } = require('chai')
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { NotFoundError } = require('../errors')
const { User, Note, Comment } = require('../models')
const { note, comment } = require('../models/schemas')
const deleteCommentFromNote = require('./deleteCommentFromNote')

describe('deleteCommentFromNote', () => {
    before(() => connect('mongodb://127.0.0.1:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())
    beforeEach(() => Note.deleteMany())

    describe('when user already exists', () => {
        let diegoUser, paulaUser

        beforeEach(() => {
            diegoUser = new User({ name: 'Diego Carvalho', username: 'diegocarve', password: '1234' })
            paulaUser = new User({ name: 'Paula Carvalho', username: 'paulacarve', password: '1234' })

            return Promise.all([diegoUser.save(), paulaUser.save()])
        })
        describe('on existing note', () => {
            let paulaNote, diegoComment

            beforeEach(() => {
                paulaNote = new Note({ user: paulaUser.id, text: 'hello world' })

                return paulaNote.save()
            })
            beforeEach('when comment exist', () => {

                diegoComment = new Comment({ user: diegoUser.id, text: 'SantaK!' })

                paulaNote.comments.push(diegoComment)

                return paulaNote.save()
            })
    
            it('succeeds on correct data ', () => {
                return deleteCommentFromNote(diegoUser.id, paulaNote.id, diegoComment.id)
                    .then(result => {
                        expect(result).to.be.undefined

                        return Note.findById(paulaNote.id)
                    })
                    .then(note => {
                        const _comment = note.comments.some(comms => comms.id === diegoComment.id)

                        expect(_comment).to.be.false

                    })
            })

            it('fails when comment does not exist', () => {
                const wrongCommentId = new ObjectId().toString()

                return deleteCommentFromNote(diegoUser.id, paulaNote.id, wrongCommentId)
                    .then(() => {
                        throw new Error('it should not reach this point')
                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal(`comment with id ${wrongCommentId} not found`)
                    })
            })
        })
  
        describe('When note does not exist', () => {
            it('fails with wrong note Id', () => {
                const wrongNoteId = new ObjectId().toString()//creo un objecto wrongNoteId 
                const wrongCommentId = new ObjectId().toString()//creo un objecto wrongCommentId 
              
                return deleteCommentFromNote(diegoUser.id, wrongNoteId, wrongCommentId)//les paso como parametros
                    .then(() => {
                        throw new Error('should not reach this point')
                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal(`note id ${wrongNoteId} does not found`)
                    })
            })
        })

        afterEach(() => User.deleteMany())
        after(() => disconnect())
    })
})







