const { connect, disconnect } = require('mongoose')
const { User, Note, Reaction, Comment } = require('./models')

    ; (async () => {
        try {
            await connect('mongodb://localhost:27017/notes-db')

            await Promise.all([User.deleteMany(), Note.deleteMany()])

            const pepito = new User({ name: 'Pepito Grillo', username: 'pepigri', password: '123123123' })
            const wendy = new User({ name: 'Wendy Bread', username: 'wendy', password: '123123123' })

            await Promise.all([pepito.save(), wendy.save()])

            const note = new Note({ user: pepito.id, text: 'hola mundo' })

            await note.save()

            {
                const reaction = new Reaction({ user: wendy.id, type: Reaction.LOVE })

                note.reactions.push(reaction)

                await note.save()
            }

            const comment = new Comment({ user: wendy.id, text: 'se escribe "Hola, Mundo!", amigo' })

            note.comments.push(comment) // WARN when pushing an item into an array mongoose does copy the sub-doc into a new object (it does not link / reference it) [1]
            // note.comments[0] = comment // WARN same here (as [1])

            await note.save()

            {
                const reaction = new Reaction({ user: pepito.id, type: Reaction.ANGRY })

                // comment.reactions.push(reaction) // WARN!!! it does not work because of [1]
                // note.markModified('comments') // this doesn't have any effect to solve [1]

                note.comments[0].reactions.push(reaction) // THIS works, accessing the comment through the object-graph starting from the root document

                await note.save()
            }

            await disconnect()
        } catch (error) {
            console.error(error)
        }
    })()