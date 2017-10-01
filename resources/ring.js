const THREE = require('three')

const accel = 0.2
const bounceLimit = 10

const Ring = class Ring {
    constructor(scene, radius) {
        this.scene = scene
        this.radius = radius
        this.position = { x: 0, y: 0, z: 0 }
        this.speedY = 0
        this.accelY = 0
        this.bounceInProgress = 0
        this.firstRender = true
        this.material = new THREE.LineDashedMaterial({
            color: 0x000,
            linewidth: 1,
            scale: 1,
            dashSize: 1,
            gapSize: 3,
            side: THREE.DoubleSide,
        })

        setInterval(this.move.bind(this), 1000/60)
        
        this.build()
        this.render()
    }

    build() {
        this.buildGeometry()
        this.buildMesh()
    }

    bounce() {
        if (this.bounceInProgress) {
            return
        }
        
        this.bounceInProgress = 1
        this.speedY = 3
    }

    move() {
        if (this.bounceInProgress == 1) {
            this.accelY = accel

            if (this.position.y > bounceLimit) {
                this.bounceInProgress = 2
            }
        }

        if (this.bounceInProgress == 2) {
            this.accelY = -accel

            if (this.position.y < -bounceLimit) {
                this.bounceInProgress = 3
            }
        }

        if (this.bounceInProgress == 3) {
            this.accelY = accel

            if (this.position.y > 0) {
                this.bounceInProgress = 0
                this.position.y = 0
                this.accelY = 0
                this.speedY = 0
            }
        }

        this.speedY += this.accelY
        this.position.y += this.speedY
    }

    render() {
        if (!this.firstRender) {
            this.scene.remove(this.mesh)
        }

        this.mesh.position.y = this.position.y
        this.scene.add(this.mesh)
        this.firstRender = false
    }

    remove() {
        this.scene.remove(this.mesh)
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

module.exports = Ring
