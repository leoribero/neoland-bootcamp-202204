const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User } = require('../models')
const { AuthError } = require('../errors')
const retrieveUser = require('./retrieveUser')
const { expect } = require('chai')

describe('retrieveUser', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    afterEach(() => User.deleteMany())

    after(() => disconnect())
})