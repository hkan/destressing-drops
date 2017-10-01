const T = require('three')

const EventEmitter = require('events')
const renderer = require('./renderer')
const scene = require('./scene')
const camera = require('./camera')
const RingManager = require('./ringManager')(scene)
const RainDropManager = require('./raindropManager')(scene)
const audio = new Audio('./drop.wav')
window.audioOpts = {
    volume: 0.3
}

window.events = new EventEmitter()

events.on('raindropped', () => {
    audio.volume = audioOpts.volume
    audio.currentTime = 0.2
    audio.play()
    
    RingManager.bounce()
})

// Create rings.
RingManager.make(50)

setTimeout(function dropper() {
    RainDropManager.make()

    setTimeout(dropper, (Math.random() + .5) * 7000)
}, 100)

// Start looping thru frames.
requestAnimationFrame(function loop() {
    // Request new frame.
    requestAnimationFrame(loop)

    // 
    RingManager.render()
    RainDropManager.render()

    // Render scene.
    renderer.render(scene, camera)
})

// Insert DOM element into the page.
document.body.appendChild(renderer.domElement)
