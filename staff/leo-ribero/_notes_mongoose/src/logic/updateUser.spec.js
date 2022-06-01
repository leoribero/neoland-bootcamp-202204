const { connect, disconnect } = require('mongoose')
const { User } = require('../models')
const updateUser = require('./updateUser')
const { expect } = require('chai')
const { NotFoundError } = require('../errors')
const { ObjectId } = require('bson')

describe('updateUser', () => {
    before(() => connect('mongodb://127.0.0.1:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    describe('when user already exists', () => {
        let user

        beforeEach(() => {
            user = new User({ name: 'Diego Carvalho', username: 'diegocarve', password: '1234' })

            return user.save()
        })

        it('succeeds on correct user data', () =>
            updateUser(user.id, 'Diego Carvalho', 34, 'diego@gmail.com', '+3412345678')
                .then(result => {
                    expect(result).to.be.undefined


                    return User.findById(user.id)
                })
                .then(user => {
                    expect(user.name).to.equal('Diego Carvalho')
                    expect(user.age).to.equal(34)
                    expect(user.email).to.equal('diego@gmail.com')
                    expect(user.phone).to.equal('+3412345678')
                })
        )

        it('fails on incorrect user id', () => {
            const wrongId = new ObjectId().toString()

            return updateUser(wrongId, 'Diego Carvalho', 34, 'diego@gmail.com', '+3412345678')
                .then(result => {

                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.be.equal(`user with id ${wrongId} does not exist`)
                })
        })
    })

    describe('when user does not exist', () => {
        it('fails on unexisting user id', () => {
            const unexistingUserId = new ObjectId().toString()

            return updateUser(unexistingUserId, 'Diego Carvalho', 34, 'diego@gmail.com', '+3412345678')
                .then(result => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.be.equal(`user with id ${unexistingUserId} does not exist`)
                })
        })
    })

    afterEach(() => User.deleteMany())
    after(() => disconnect())
})


