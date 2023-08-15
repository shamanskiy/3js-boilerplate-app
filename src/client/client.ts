import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Stats from "three/examples/jsm/libs/stats.module"
import { GUI } from "dat.gui"

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.TorusGeometry()
const material = new THREE.MeshBasicMaterial({
  wireframe: true
})

const occurrence = new THREE.Mesh(geometry, material)
scene.add(occurrence)

window.addEventListener("resize", onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const modelFolder = gui.addFolder("Model")
modelFolder.open()
modelFolder.add(occurrence.rotation, "x", 0, Math.PI * 2)
modelFolder.add(occurrence.rotation, "y", 0, Math.PI * 2)
modelFolder.add(occurrence.rotation, "z", 0, Math.PI * 2)
const cameraFolder = gui.addFolder("Camera")
cameraFolder.open()
cameraFolder.add(camera.position, "z", 1, 20)

function animate() {
  requestAnimationFrame(animate)
  render()
  stats.update()
}

function render() {
  renderer.render(scene, camera)
}

animate()
