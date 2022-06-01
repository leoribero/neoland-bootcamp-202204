const { connect, disconnect } = require('mongoose')
const { User, Note, Reaction, Comment } = require('./models')

    ; (async () => {
        try {
            await connect('mongodb://127.0.0.1:27017/notes-db')//coneccíon a la db de mongo

            await Promise.all([User.deleteMany(), Note.deleteMany()])//promise delete todo

            //creo dos usuários 
            const pepito = new User({ name: 'Pepito Grillo', username: 'pepigri', password: '123123123' })
            const wendy = new User({ name: 'Wendy Bread', username: 'wendy', password: '123123123' })

            await Promise.all([pepito.save(), wendy.save()])//salvo los dos

            const note = new Note({ user: pepito.id, text: 'hola mundo' })//creo una nueva nota

            await note.save()//la salvo

            {
                const reaction = new Reaction({ user: wendy.id, type: Reaction.LOVE })//creo una nueva reacción 

                note.reactions.push(reaction)//la añado en la nota

                await note.save()//salvo la nota
            }

            const comment = new Comment({ user: wendy.id, text: 'se escribe "Hola, Mundo!", amigo' })//creo un comentário (para la nota)

            //añado el comentário en la nota
            note.comments.push(comment) // WARN when pushing an item into an array mongoose does copy the sub-doc into a new object (it does not link / reference it) [1]
            // note.comments[0] = comment // WARN same here (as [1])

            await note.save()//salvo la nota

         //REACTION 
            {
                const reaction = new Reaction({ user: pepito.id, type: Reaction.ANGRY })//creo una nueva reaction

                // comment.reactions.push(reaction) // WARN!!! it does not work because of [1]
                // note.markModified('comments') // this doesn't have any effect to solve [1]


                //añado la reacción en el comentário de la nota
                note.comments[0].reactions.push(reaction) // THIS works, accessing the comment through the object-graph starting from the root document

                await note.save()//salvo la nota
            }

            await disconnect()
        } catch (error) {
            console.error(error)
        }
    })()