describe('createNote', () => {

    it('should be OK for existing user', () => {
        db.users.length = 0
        db.notes.length = 0
        db.users.push(new User('John Doe', 'john', '123123123', 'Goodbye cruel world!'))

        

        createNote('john', 'Goodbye cruel world!', function(error) {
            expect(error).toBeNull()

            const note = db.notes[0]

            expect(note).toBeDefined()
            expect(note).toBeInstanceOf(Note)
            expect(note.username).toBe('john')
            expect(note.text).toBe('Goodbye cruel world!')
            expect(note.date).toBeDefined()
            expect(note.date).toBeInstanceOf(Date) // que sea instancia del constructor fecha
        })

        //vamos a limpiar la DB despues del test
        db.notes.length = 0
        db.users.length = 0
    })

    it('should be KO for non-existing user', () => {

        db.users.length = 0
        db.notes.length = 0

        createNote('john', 'Goodbye cruel world!', function(error) {
            expect(error).toBeDefined() // si toBeNull quiere decir que no existe, esto, toBeDefined quiere decir lo contrario
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('username "john" does not exist')

        })

        db.notes.length = 0
        db.users.length = 0
    })
    // llegado este Manu comenzo a dar contenido a createNote.js

    
})