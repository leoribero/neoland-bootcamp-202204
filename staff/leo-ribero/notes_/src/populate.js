const { connect, disconnect } = require('mongoose')
const { User, Note } = require('./models');

(async () => {
    try {
        await connect('mongodb://localhost:27017/notes-db-test')

        const user = new User({ name: 'Juan Valdez', username: 'juanvaldez', password: '123123123' })

        await user.save()

        const note = new Note({ user: user.id, text: 'hola mundo' })

        await note.save()

        await disconnect()
    } catch (error) {
        console.error(error)
    }
})()