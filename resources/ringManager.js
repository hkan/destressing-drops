const Ring = require('./ring')

/**
 * @type {Array<Ring>}
 */
window.rings = []

const Manager = module.exports = scene => ({
    make(count) {
        if (rings.length) {
            Manager.removeAll()
        }
        
        rings = require('lodash/range')(10, 10 + (5 * (count-1)), 5).map((radius, index) => {
            let ring = new Ring(scene, radius)

            return ring
        })
    },

    bounce() {
        rings.forEach((ring, index) => {
            setTimeout(() => ring.bounce(10 * (rings.length - index + 1)), index * 100)
        })
    },
    
    removeAll() {
        rings.forEach(ring => ring.remove())
    },

    render() {
        rings.forEach(ring => ring.render())
    },
})
