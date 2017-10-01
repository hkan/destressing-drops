const RainDrop = require('./raindrop')

/**
 * @type {Array<RainDrop>}
 */
window.rainDrops = []

const Manager = module.exports = scene => ({
    make(count) {
        let rd = new RainDrop(scene, rainDrops.length)

        rainDrops.push(rd)

        return rd
    },

    removeAll() {
        rainDrops.forEach(rd => rd.remove())
    },

    render() {
        rainDrops.forEach(rd => rd.render())
    },
})
