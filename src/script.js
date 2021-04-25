import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { TextureLoader } from 'three'
import { mergeWithCustomize } from 'webpack-merge'

// Debug
const gui = new dat.GUI()

//texture loading

//earth
// const texture = new THREE.TextureLoader().load('/textures/NormalMapEarth.png');

//randommap
const texture = new THREE.TextureLoader().load('/textures/NormalMap.jpg');


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects


const geometry = new THREE.SphereBufferGeometry(.8, 40, 64)
// Material
// const material = new THREE.MeshStandardMaterial( {
//     normalMap: texture,
//     color: 0x292929,
//     metalness: 0.7,
//     roughness: 0.3
// })


//another type
const material = new THREE.MeshStandardMaterial( {
    // normalMap: texture,
    color: 0x49ef4,
    // metalness: 0.7,
    // roughness: 0.3,
    wireframe: true,
})



// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)


// Lights



const pointLight = new THREE.PointLight(0x1F6AC5, 2)
pointLight.position.x = -10
pointLight.position.y = -10
pointLight.position.z = 2
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffff, 2)
// pointLight2.position.x = 2
// pointLight2.position.y = 3
// pointLight2.position.z = 4
pointLight2.position.set(6.2,4.43,2.36)
pointLight2.intensity = 2

scene.add(pointLight2)


// // Dat.gui
// const dBlueLight = gui.addFolder('Dark Blue Light')
// const lBlueLight = gui.addFolder('Light Blue Light')

// dBlueLight.add(pointLight.position, 'y').min(-10).max(10).step(0.01)
// dBlueLight.add(pointLight.position, 'x').min(-10).max(10).step(0.01)
// dBlueLight.add(pointLight.position, 'z').min(0).max(10).step(0.01)
// dBlueLight.add(pointLight, 'intensity').min(0).max(10).step(0.01)

// lBlueLight.add(pointLight2.position, 'y').min(-10).max(10).step(0.01)
// lBlueLight.add(pointLight2.position, 'x').min(-10).max(10).step(0.01)
// lBlueLight.add(pointLight2.position, 'z').min(0).max(10).step(0.01)
// lBlueLight.add(pointLight2, 'intensity').min(0).max(10).step(0.01)


// comment or uncomment as you see fit

// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper( pointLight2, sphereSize );
// scene.add( pointLightHelper );

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */


document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

//activate the thing when ur mouse is half of window x,y
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001

}

window.addEventListener('scroll', updateSphere)


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .2 * elapsedTime


    //manual orbit mouse
    sphere.rotation.y += .3 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .1 * (targetY - sphere.rotation.x)

    //basically changes the size
    sphere.position.z += .2 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()