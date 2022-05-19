/*
3 cars
first car that reaches 100 steps (count) wins
take into account two or all cars can reach at the same time (tie)
show results below
*/

class Vehicle {
    constructor(icon) {
        this.icon = icon
        this.position = 0
        this.count = 0
    }

    goForward(maxSteps, maxLength) {
        const steps = Math.round(Math.random() * maxSteps)
        this.count += steps
        this.position += steps
        if (this.position > maxLength) this.position -= maxLength
        console.log(`${' '.repeat(this.position)}${this.icon} (${this.count})`)
    }
}

const thief = new Vehicle('🚘')
const police = new Vehicle('🚔')
const taxi = new Vehicle('🚖')
const bus = new Vehicle('🚍')

const goal = 50
const maxLength = 110
const maxSteps = 5

const interval = setInterval(() => {
    console.clear()

    thief.goForward(maxSteps, maxLength)
    police.goForward(maxSteps, maxLength)
    taxi.goForward(maxSteps, maxLength)
    bus.goForward(maxSteps, maxLength)

    if (thief.position >= goal || police.position >= goal || taxi.position >= goal || bus.position >= goal) {
        clearInterval(interval)

        const reached = []

        if (thief.position >= goal)
            reached.push(thief)

        if (police.position >= goal)
            reached.push(police)

        if (taxi.position >= goal)
            reached.push(taxi)

        if (bus.position >= goal)
            reached.push(bus)

        if (reached.length === 1)
            console.log(`${reached[0].icon} wins`)
        else {
            console.log(`${reached.map(vehicle => vehicle.icon).join(' ')} tie`)
        }
    }
}, 100)