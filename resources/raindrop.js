const THREE = require('three')

const RainDrop = class RainDrop {
    constructor() {
        this.position = {x: 0, y: -500, z: 0}
        this.geometry = new THREE.SphereGeometry(5, 32, 32)
        this.material = new THREE.MeshBasicMaterial({ color: 0x0 })
        this.speedY = 0.5

        setInterval(this.move.bind(this), 1000/60)
    }

    move() {
        if (this.position.y < 0) {
            this.speedY += 0.1
        } else {
            this.speedY = -this.speedY * .6
        }

        this.position.y += this.speedY
    }

    render() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        Object.assign(this.mesh.position, this.position)
    }
}

module.exports = RainDrop
