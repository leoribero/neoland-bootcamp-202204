require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const {
    handleRegisterUser,
    handleAuthenticateUser,
    handleRetrieveUser,
    handleUpdateUser,
    handleDeleteUser,
    handleCreateNote,
    handleRetrieveNotes,
    handleUpdateNote,
    handleDeleteNote,
    handleAddCommentToNote,
    handleDeleteCommentFromNote} = require('./handlers')
const { connect, disconnect } = require('mongoose')

    ; (async () => {
        await connect('mongodb://127.0.0.1:27017/notes-db')//mongodb://127.0.0.1:27017

        console.log('DB connected')

        const api = express()

        const jsonBodyParser = bodyParser.json()

        const routes = express.Router()//El router se refiere a cómo los endpoints de una la app (URI) responden a las solicitudes de los clients.

        routes.post('/users', jsonBodyParser, handleRegisterUser)//registerUser
        routes.post('/users/auth', jsonBodyParser, handleAuthenticateUser)//authenticateUser
        routes.get('/users', handleRetrieveUser)//retrieveUser
        routes.patch('/users', jsonBodyParser, handleUpdateUser)//updateUser
        routes.delete('/users', jsonBodyParser, handleDeleteUser)//deleteUser

        routes.post('/notes', jsonBodyParser, handleCreateNote)//createNote
        routes.get('/notes', handleRetrieveNotes)//retrieveNote
        routes.patch('/notes/:noteId', jsonBodyParser, handleUpdateNote)//updateNote
        routes.delete('/notes/:noteId', jsonBodyParser, handleDeleteNote)//deleteNote
        routes.post('/notes/:noteId/comments', jsonBodyParser, handleAddCommentToNote)//addCommentToNote
        routes.delete('/notes/:noteId/comments/:commentId', jsonBodyParser, handleDeleteCommentFromNote)//deleteCommentFromNote

        api.use('/api', routes)//ruta

        api.listen(8080, () => console.log('API running'))//client

        process.on('SIGINT', async () => {//para frenar la ejecución 
            await disconnect()//desconectar

            console.log('\nDB disconnected')

            process.exit(0)//salir
        })
    })()

// No sabemos de mongo
// sabemos de logic y de cliente (insmonmia)