const fs = require('fs')

// fs.access('./createUser__.js', fs.constants.F_OK, err => {
//   console.log(err)
// })

fs.readdir('./src/logic', (error, files) => {
    console.log(error, files)
})