const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User } = require('../models')
const { AuthError } = require('../errors')
const retrieveUser = require('./retrieveUser')
const { expect } = require('chai')

describe('retrieveUser', () => {
    before(() => connect('mongodb://127.0.0.1:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    describe('when user already exists', () => {
        let user

        beforeEach(() => {
            user = new User({ name: 'Diego Carvalho', username: 'diegocarve', password: '1234' })

            return user.save()
        })

        it('succeeds on correct user id', () =>
            retrieveUser(user.id)
                .then(user => {
                    expect(user.constructor).to.equal(Object)
                    expect(user.name).to.equal('Diego Carvalho')
                    expect(user.username).to.equal('diegocarve')
                    expect(user.password).to.be.undefined
                    expect(user.id).to.be.undefined
                })
        )

        it('fails on incorrect id', () => {
            const wrongId = new ObjectId().toString()

            retrieveUser(wrongId)
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`user with id ${wrongId} does not exist`)
                })
        })
    })

    describe('when user does not exist', () => {
        it('fails on user id from non-existing user', () => {
            const unexistingUserId = new ObjectId().toString()

            retrieveUser(unexistingUserId)
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`user with id ${unexistingUserId} does not exist`)
                })
        })
    })

    afterEach(() => User.deleteMany())

    after(() => disconnect())
})