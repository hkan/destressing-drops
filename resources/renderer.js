const THREE = require('three')

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth - 50, window.innerHeight - 50)

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth - 50, window.innerHeight - 50)
}, false)

module.exports = renderer
