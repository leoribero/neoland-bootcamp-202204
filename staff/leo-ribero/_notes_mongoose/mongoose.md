- (TDD) el plantear el spec. con testes bien sucedidos y mal sucedidos.

- conectamos a la BBDD y hacemos toda la config necesaria.

- borramos todos los docs de notas (deleteMany())

- borramos todos los docs de users(deleteMany())

- creamos un  usuario y guardamos el id para luego poder usarlo para seguintes pasos.

- cremaos varias notas para ese usuario(unas 5 )

- llamamos a la función lógic correspondiente para comprobar su funcionamiento(happy path)

- comprobamos si la respuesta es un array,tiene todas las notas introducidas(length) y comprobamos que son las notas que hemos metido en el anterior paso.

- Borranmos todos los documentos de notes (deleteMany)

- Borranmos todos los documentos de users (deleteMany)
