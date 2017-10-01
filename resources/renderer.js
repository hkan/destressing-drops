const THREE = require('three')

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth - 50, window.innerHeight - 50)

module.exports = renderer
