const THREE = require('three')
let rings = []

const Ring = class Ring {
    constructor(scene, radius) {
        this.scene = scene
        this.radius = radius
        this.position = { x: 0, y: 0, z: 0 }
        this.speedY = 0
        this.firstRender = true
        this.material = new THREE.LineDashedMaterial({
            color: 0x000,
            linewidth: 1,
            scale: 1,
            dashSize: 1,
            gapSize: 3,
            side: THREE.DoubleSide,
        })

        this.build()
        this.render()
    }

    build() {
        this.buildGeometry()
        this.buildMesh()
    }

    render() {
        if (!this.firstRender) {
            this.scene.remove(this.mesh)
        }

        if (this.speedY == 0 || this.position.y > 30) {
            this.speedY = -1
        }

        if (this.position.y < -30) {
            this.speedY = 1
        }

        this.position.y += this.speedY
        Object.assign(this.mesh.position, this.position)

        this.scene.add(this.mesh)
        this.firstRender = false
    }

    buildGeometry() {
        let outerRadiusDiff = 0.1 + ((16 - (this.radius / 10)) / 10)
        this.geometry = new THREE.RingGeometry(this.radius, this.radius + outerRadiusDiff, this.radius * 2)
    }

    buildMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = Math.PI * (13 / 36) // 130deg
    }
}

module.exports = {
    make(scene) {
        rings = require('lodash/range')(10, 150, 5).map((radius, index) => {
            let ring = new Ring(scene, radius)

            ring.position.y = index
            
            return ring
        })
    },

    render() {
        rings.forEach(ring => ring.render())
    }
}
