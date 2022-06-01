const express = require('express')
const bodyParser = require('body-parser')
const { registerUser, authenticateUser, retrieveUser, updateUser, retrieveNotes } = require('./logic')
const { ConflictError, FormatError, AuthError, NotFoundError } = require('./errors')
const { connect, disconnect } = require('mongoose')
const { generateToken, verifyToken } = require('./helpers')

connect('mongodb://localhost:27017/notes-db')
    .then(() => {
        console.log('DB connected')

        const api = express()

        const jsonBodyParser = bodyParser.json()
        
        //registerUser
        api.post('/api/users', jsonBodyParser, (req, res) => {
            try {
                const { body: { name, username, password } } = req

                registerUser(name, username, password)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof ConflictError)
                            status = 409

                        res.status(status).json({ error: error.message })
                    })
            } catch (error) {
                let status = 500 

                if (error instanceof TypeError || error instanceof FormatError)
                    status = 400

                res.status(status).json({ error: error.message })
            }
        })
        // authenticateUser
        api.post('/api/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { body: { username, password } } = req

                authenticateUser(username, password)
                    .then(userId => res.status(200).json({ token: userId }))
                    .catch(error => {
                        let status = 500

                        if (error instanceof AuthError)
                            status = 401

                        res.status(status).json({ error: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof FormatError)
                    status = 400

                res.status(status).json({ error: error.message })
            }
        })
        // retrieveUser
        api.get('/api/users', (req, res) => {
            try {
                const { headers: { authorization } } = req

                const [, userId] = authorization.split(' ')

                retrieveUser(userId)
                    .then(user => res.status(200).json(user))
                    .catch(error => {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.message })
                    })
            } catch (error) {
                let status = 500

                if(error instanceof TypeError || error instanceof FormatError)
                status = 400

                res.status(status).json({ error: error.message })
            }
        })
        
        // updateUser
        api.patch('/api/users', jsonBodyParser, (req, res) => {
            try {
                const { headers: { authorization } } = req

                const [, userId] = authorization.split(' ')

                const { body: { name, age, email, phone } } = req

                updateUser(userId, name, age, email, phone)
                    .then(() => res.status(204).send())
                    .catch(error => {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.message })
                    })
            } catch (error) {
                let status = 500

                if (error instanceof TypeError || error instanceof FormatError || error instanceof RangeError)
                    status = 400

                res.status(status).json({ error: error.message })
            }
        })
        // retrieveNotes
        api.get('/api/notes', (req, res) => {
            try {
                const { headers: { authorization } } = req

                const [, userId] = authorization.split(' ')

                retrieveNotes(userId)
                    .then(user => res.status(200).json(user))
                    .catch(error => {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.message })
                    })
            } catch (error) {
                let status = 500

                if(error instanceof TypeError || error instanceof FormatError)
                status = 400

                res.status(status).json({ error: error.message })
            }
        })


        api.listen(8080, () => console.log('API running'))
    })