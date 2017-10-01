const T = require('three')

const EventEmitter = require('events')
const renderer = require('./renderer')
const scene = require('./scene')
const camera = require('./camera')
const RingManager = require('./ringManager')(scene)
const RainDrop = require('./raindrop')

window.events = new EventEmitter()

// Create rings.
RingManager.make(30)

document.body.addEventListener('click', () => {
    RingManager.bounce()
}, false)

// Start looping thru frames.
requestAnimationFrame(function loop() {
    // Request new frame.
    requestAnimationFrame(loop)

    // 
    RingManager.render()

    // Render scene.
    renderer.render(scene, camera)
})

// Insert DOM element into the page.
document.body.appendChild(renderer.domElement)
