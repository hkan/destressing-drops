const T = require('three')

const renderer = require('./renderer')
const scene = require('./scene')
const camera = require('./camera')
const Rings = require('./ring')
const Ball = require('./ball')
let ball

Rings.make(scene)

document.body.appendChild(renderer.domElement)

document.body.addEventListener('click', () => {
    if (ball) {
        scene.remove(ball.mesh)
    }

    ball = new Ball()
    ball.render()

    scene.add(ball.mesh)
}, false)

requestAnimationFrame(function loop() {
    requestAnimationFrame(loop)

    if (ball) {
        scene.remove(ball.mesh)
        ball.render()
        scene.add(ball.mesh)
    }

    Rings.render()
    renderer.render(scene, camera)
})
