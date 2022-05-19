const { access, constants, readdir, readFile, unlink } = require('fs')
const createUser = require('./createUser')
const { expect } = require('chai')

describe('createUser', () => {
    it('succeeds on new user and correct user data', done => {
        readdir(`./db/users`, (error, files) => {
            if (error) return done(error)

            let count = 0, _error

            files.forEach(file => {
                unlink(`./db/users/${file}`, error => {
                    if (!_error) {
                        if (error) return done(_error = error)

                        count++

                        if (count == files.length) {
                            createUser('John Doe', 'johndoe', '123123123', (error, userId) => {
                                expect(error).to.be.null

                                expect(userId).to.be.a('string')

                                const file = `./db/users/${userId}.json`

                                access(file, constants.F_OK, error => {
                                    expect(error).to.be.null

                                    readFile(file, 'utf8', (error, json) => {
                                        expect(error).to.be.null

                                        expect(json).to.be.a('string')

                                        const user = JSON.parse(json)
                                        expect(user.name).to.equal('John Doe')
                                        expect(user.username).to.equal('johndoe')
                                        expect(user.password).to.equal('123123123')

                                        done()
                                    })
                                })
                            })
                        }
                    }
                })
            })
        })
    })
})