const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Note } = require('../models')
const { NotFoundError } = require('../errors')
const addCommentToNote = require('./addCommentToNote')
const { expect } = require('chai')
const { Comment, comment } = require('../models/schemas')

describe('addCommentToNote', () => {
    before(() => connect('mongodb://127.0.0.1:27017/notes-db-test'))

    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    describe('when user already exists', () => {
        let diegoUser, paulaUser

        beforeEach(() => {
            diegoUser = new User({ name: 'Diego Carvalho', username: 'diegocarve', password: '1234' })
            paulaUser = new User({ name: 'Paula Carvalho', username: 'paulacarve', password: '1234' })

            return Promise.all([diegoUser.save(), paulaUser.save()])

        })
        describe('when note exists', () => {
            let paulaNote

            beforeEach(() => {
                paulaNote = new Note({ user: paulaUser.id, text: 'hello world' })

                return paulaNote.save()
            })
            
            it('succeeds on correct data ', () => {
                return addCommentToNote(diegoUser.id, paulaNote.id, 'SantaK!')
                    .then(commentId => {
                        expect(commentId).to.be.a('string')
                        debugger
                        return Note.findById(paulaNote.id)
                            // Note.findOne({ comments: [ _id: commentId]})
                            .then(note => {
                                const comment = note.comments.find(comment => comment._id.toString() === commentId)

                                expect(comment.text).to.be.equal('SantaK!')
                                expect(comment.user.toString()).to.be.equal(diegoUser.id)
                                expect(comment.date).to.be.instanceOf(Date)

                            })
                    })

            })
        })

    })


    afterEach(() => User.deleteMany())

    after(() => disconnect())
})