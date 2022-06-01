const { expect } = require('chai')
const { connect, disconnect, Types:{ObjectId}} = require('mongoose')
const { AuthError } = require('../errors')
const { User } = require('../models')
const deleteUser = require('./deleteUser')


describe('deleteUser', () => {
    before(() => connect('mongodb://127.0.0.1:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    describe('when user already exists', () => {
        let user

        beforeEach(() => {
            user = new User({ name: 'Diego Carvalho', username: 'diegocarve', password: '1234' })

            return user.save()
        })
        it('succeds on correct user id and password', () => {
            deleteUser(user.id, '1234')
                .then(() => {
                    return User.findById(user.id)
                })
                .then(result => {
                    expect(result).to.null
                })
        })

        it('fails on incorrect password and correct token', () => {
            return deleteUser(user.id, '123456')
                .then(() => {
                    throw new Error('it should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(AuthError)
                    expect(error.message).to.equal('wrong credentials')
                })
        })

        it('fails on incorrect token and correct password', () => {
            return deleteUser(new ObjectId().toString(), '1234')
                .then(() => {
                    throw new Error('it should not reach this point')
                })
                .catch(error => {
                    debugger
                    expect(error).to.be.instanceOf(AuthError)
                    expect(error.message).to.equal('incorrect Id')
                })
        })
    })

    describe('on unexisting user', () => {
        it('fails on incorrect token and password', () => {
            return deleteUser(new ObjectId().toString(), '123456')
                .then(() => {
                    throw new Error('it should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(AuthError)
                    expect(error.message).to.equal('incorrect Id')
                })
        })
    })

    afterEach(() => User.deleteMany())
    after(() => disconnect())
})

