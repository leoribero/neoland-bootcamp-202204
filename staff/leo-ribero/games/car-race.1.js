/*
3 cars
first car that reaches 100 steps (count) wins
take into account two or all cars can reach at the same time (tie)
show results below
*/

const thief = '🚘'
const police = '🚔'
const taxi = '🚖'
const bus = '🚍'

let thiefCount = 0
let thiefPosition = 0
let policeCount = 0
let policePosition = 0
let taxiCount = 0
let taxiPosition = 0
let busCount = 0
let busPosition = 0

const goal = 100
const lineLength = 110
const step = 5

const interval = setInterval(() => {
    console.clear()

    const thiefSteps = Math.round(Math.random() * step)
    thiefCount += thiefSteps
    thiefPosition += thiefSteps
    if (thiefPosition > lineLength) thiefPosition -= lineLength
    console.log(`${' '.repeat(thiefPosition)}${thief} (${thiefCount})`)

    const policeSteps = Math.round(Math.random() * step)
    policeCount += policeSteps
    policePosition += policeSteps
    if (policePosition > lineLength) policePosition -= lineLength
    console.log(`${' '.repeat(policePosition)}${police} (${policeCount})`)

    const taxiSteps = Math.round(Math.random() * step)
    taxiCount += taxiSteps
    taxiPosition += taxiSteps
    if (taxiPosition > lineLength) taxiPosition -= lineLength
    console.log(`${' '.repeat(taxiPosition)}${taxi} (${taxiCount})`)

    const busSteps = Math.round(Math.random() * step)
    busCount += busSteps
    busPosition += busSteps
    if (busPosition > lineLength) busPosition -= lineLength
    console.log(`${' '.repeat(busPosition)}${bus} (${busCount})`)

    if (thiefPosition >= goal || policePosition >= goal || taxiPosition >= goal || busPosition >= goal) {
        clearInterval(interval)

        const reached = []

        if (thiefPosition >= 100)
            reached.push(thief)

        if (policePosition >= 100)
            reached.push(police)

        if (taxiPosition >= 100)
            reached.push(taxi)

        if (busPosition >= 100)
            reached.push(bus)

        if (reached.length === 1)
            console.log(`${reached[0]} wins`)
        else {
            console.log(`${reached.join(' ')} tie`)
        }
    }
}, 100)