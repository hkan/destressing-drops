const THREE = require('three')
const camera = new THREE.PerspectiveCamera(250, window.innerWidth / window.innerHeight, 0.1, 10000)

camera.position.z = 200
// camera.position.y = -20
//camera.rotation.x = Math.PI * (5/50)

window.camera = camera

module.exports = camera
