// const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
// const { User, Note } = require('../models')
// const { NotFoundError } = require('../errors')
// const listNotes = require('./listNotes')
// const { expect } = require('chai')

// describe('listNotes', () => {
//     before(() => connect('mongodb://127.0.0.1:27017/notes-db-test'))

//     beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

//     describe('when user and notes exists', () => {
//         let userId

//         beforeEach(() => {
//             return User.create({ name: 'lucatiel', username: 'lucataiel', password: '123123123'})
//             .then(user => {
//                 userId = user.id
//                 const textNotes = [
//                     'text1',
//                     'text2',
//                     'text3',
//                     'text4',
//                     'text5',
//                 ]
//                 const notesPromises = textNotes.map(text => Note.create({ user: userId, text: 'este es mi texto'}))
//                 Promise.all(notesPromises)
//             })
//         })

//         it('retrive all notes', () =>{
//             return listNotes(userId)
//             .then(notes => {
//                 expect(notes).to.be.instanceOf(Array)
//                 expect(notes.length).to.be.equal(5)
//                 // TODO check if the notes are correct
//             })
//         })
//     })

//     afterEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

//     after(() => disconnect())
// })