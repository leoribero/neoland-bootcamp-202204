const express = require('express')
const bodyParser = require('body-parser')
const { createUser, authenticateUser, retrieveUser } = require('./logic')

const server = express()

const formBodyParser = bodyParser.urlencoded({ extended: true })

// http://localhost:8080/hello?name=Pepito (req)
// Hello, Pepito! (res)
// (middleware)
server.get('/hello', (req, res) => { // handler
    const name = req.query.name

    res.status(201).send(`<h1>Hello, ${name}!</h1>`)
})

server.get('/register', (req, res) => {
    res.status(200).send(`<html>
    <head><head>
    <body>
        <form method="POST" action="/register">
            <input type="text" name="name" placeholder="name">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password"/>
            <button>Register</button>
        </form>
    </body>
    </html>`)
})

server.post('/register', formBodyParser, (req, res) => {
    try {
        const { name, username, password } = req.body

        createUser(name, username, password, (error, userId) => {
            if (error)
                return res.status(400).send(`<h1>${error.message}</h1>`)

            res.status(201).send(`<h1>User registered ${userId}</h1>`)
        })
    } catch (error) {
        res.status(400).send(`<h1>${error.message}</h1>`)
    }
})

server.get('/login', (req, res) => {
    res.status(200).send(`<html>
    <head><head>
    <body>
        <form method="POST" action="/login">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password"/>
            <button>Login</button>
        </form>
    </body>
    </html>`)
})

server.post('/login', formBodyParser, (req, res) => {
    try {
        const { username, password } = req.body

        authenticateUser(username, password, (error, userId) => {
            if (error)
                return res.status(400).send(`<h1>${error.message}</h1>`)

            //res.send(`<h1>User authenticated ${userId}</h1>`)
            res.redirect(`/home?userId=${userId}`)
        })
    } catch (error) {
        res.status(400).send(`<h1>${error.message}</h1>`)
    }
})

server.get('/home', (req, res) => {
    try {
        const { userId } = req.query

        retrieveUser(userId, (error, user) => {
            if (error)
                return res.status(400).send(`<h1>${error.message}</h1>`)

            res.status(200).send(`<html>
                <head><head>
                <body>
                    <h1>Hello, ${user.name}!</h1>
                </body>
                </html>`)
        })
    } catch (error) {
        res.status(400).send(`<h1>${error.message}</h1>`)
    }
})

server.listen(8080, () => console.log('server started'))