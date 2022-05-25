const express = require('express')
const bodyParser = require('body-parser')
const {
    createUser,
    authenticateUser,
    retrieveUser,
    retrieveNotes
} = require('./logic')
const { parseCookies } = require('./utils')

const server = express()

server.use(express.static('public'))

const formBodyParser = bodyParser.urlencoded({ extended: true })

server.get('/register', (req, res) => {
    try {
        const { userId } = parseCookies(req.header('cookie'))

        if (userId)
            return res.redirect('/')

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
    } catch (error) {
        res.status(400).send(`<h1>${error.message}</h1>`)
    }
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
    try {
        const { userId } = parseCookies(req.header('cookie'))

        if (userId)
            return res.redirect('/')

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
    } catch (error) {
        res.status(400).send(`<h1>${error.message}</h1>`)
    }
})

server.post('/login', formBodyParser, (req, res) => {
    try {
        const { username, password } = req.body

        authenticateUser(username, password, (error, userId) => {
            if (error)
                return res.status(400).send(`<h1>${error.message}</h1>`)

            res.cookie('userId', userId)
            res.redirect(`/`)
        })
    } catch (error) {
        res.status(400).send(`<h1>${error.message}</h1>`)
    }
})

server.get('/', (req, res) => {
    try {
        const { userId } = parseCookies(req.header('cookie'))

        if (!userId)
            return res.redirect('/login')

        retrieveUser(userId, (error, user) => {
            if (error)
                return res.status(400).send(`<h1>${error.message}</h1>`)

            retrieveNotes(userId, (error, notes) => {
                if (error)
                    return res.status(400).send(`<h1>${error.message}</h1>`)

                res.status(200).send(`<html>
                <head>
                    <link rel="stylesheet" href="index.css">
                <head>
                <body>
                    <h1>Hello, ${user.name}!</h1>
                    <form method="POST" action="/logout">
                        <button>Logout</button>
                    </form>
                    <form method="POST" action="/create-note">
                        <textarea name="text"></textarea>
                        <button>Save</button>
                    </form>
                    <ul>
                        ${notes.map(note => `<li>
                            ${note.text}
                            <form method="POST" action="/delete-note/${note.id}">
                                <button>x</button>
                            </form>
                        </li>`).join('')}
                    </ul>
                </body>
                </html>`)
            })
        })
    } catch (error) {
        res.status(400).send(`<h1>${error.message}</h1>`)
    }
})

server.post('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/login')
})

server.post('/save-note', formBodyParser, (req, res) => {
    try {
        const { userId } = parseCookies(req.header('cookie'))

        if (!userId)
            return res.redirect('/login')

        const { text } = req.body

        // ... createNote(userId, text, error => { ... res.redirect('/') })
    } catch (error) {
        // ...
    }
})

server.post('/delete-note/:noteId', (req, res) => {
    try {
        const { userId } = parseCookies(req.header('cookie'))

        if (!userId)
            return res.redirect('/login')

        const { noteId } = req.params

        // ... deleteNote(userId, noteId, error => ... res.redirect('/') )

        res.send(`TODO delete note with id ${noteId}`)
    } catch (error) {
        // ...
    }
})

server.listen(8080, () => console.log('server started'))