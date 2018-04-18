const THREE = require('three')

const RainDrop = class RainDrop {
    constructor(scene, index) {
        this.scene = scene
        this.index = index
        this.firstRender = true
        this.position = { x: 0, y: -window.innerHeight / 2, z: 0 }
        this.radius = 5
        this.material = new THREE.MeshBasicMaterial({ color: 0x333333 })
        this.speedY = 0.0005
        this.accelY = 0.04
        this.touchedSurface = false

        this.buildGeometry()
        this.interval = setInterval(this.move.bind(this), 1000 / 60)
    }

    move() {
        if (this.position.y > 0) {
            if (!this.touchedSurface) {
                events.emit('raindropped')
                this.touchedSurface = true
            }
        }

        this.speedY += this.accelY
        this.position.y += this.speedY

        if (this.touchedSurface) {
            this.position.y = rings[0].mesh.position.y
            this.radius -= 0.07

            if (this.radius < 1) {
                clearInterval(this.interval)
                this.mesh.position.y = 999999
                return this.remove(true)
            }
            
            this.buildGeometry()
        }
    }

    remove(removeFromList) {
        if (removeFromList) {
            rainDrops.splice(this.index, 1)
        }
        this.scene.remove(this.mesh)
    }

    render() {
        if (!this.firstRender) {
            this.remove()
        }

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        Object.assign(this.mesh.position, this.position)

        this.scene.add(this.mesh)

        this.firstRender = false
    }

    buildGeometry() {
        this.geometry = new THREE.SphereGeometry(this.radius, this.radius * (8 / 5), this.radius * (8 / 5))
    }
}

module.exports = RainDrop
