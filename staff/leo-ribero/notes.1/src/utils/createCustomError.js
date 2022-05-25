function createCustomError(name) {
    const customError = class extends Error {
        constructor(message) {
            super(message)
        }
    }

    customError.prototype.name = name

    return customError
}

//export default createCustomError ts120527d3
module.exports = createCustomError