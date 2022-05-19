const thief = '🚘'
const police = '🚔'

let thiefCount = 10
let thiefPosition = thiefCount
let policeCount = 0
let policePosition = 0

const interval = setInterval(() => {
    console.clear()

    const thiefSteps = Math.round(Math.random() * 5)
    thiefCount += thiefSteps

    thiefPosition += thiefSteps
    if (thiefPosition > 100) thiefPosition -= 100

    const policeSteps = Math.round(Math.random() * 6)
    policeCount += policeSteps

    policePosition += policeSteps
    if (policePosition > 100) policePosition -= 100

    console.log(`${' '.repeat(thiefPosition)}${thief} (${thiefCount})`)
    console.log(`${' '.repeat(policePosition)}${police} (${policeCount})`)

    if (policeCount > thiefCount) {
        console.log('catched!')

        clearInterval(interval)
    }
}, 100)