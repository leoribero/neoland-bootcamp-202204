const { connect, disconnect } = require('mongoose')
const { User } = require('../models')
const { ConflictError } = require('../errors')
const updateUser = require('./updateUser')
const registerUser = require('./registerUser')
const { expect } = require('chai')

describe('updateUser', () => {
    debugger
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    it('succeeds on correct credentials', () => {
        return User.create ({name: 'Ramon Mon', username: 'ramonmon', password: '123123123'})
            .then(result => {
                // result.id // devuekve el id del usuario creado comoo string
                return updateUser(result.id, "Wednesday251258")
            })
            .then(result => {
                expect(result).to.be.undefined
            })
    })
    
})