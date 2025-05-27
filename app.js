import * as THREE from 'three';
import Web3 from 'web3';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Grid tanah
for(let x = 0; x < 50; x++) {
    for(let z = 0; z < 50; z++) {
        let geometry = new THREE.BoxGeometry(1, 0.1, 1);
        let material = new THREE.MeshBasicMaterial({color: 0x00ffcc});
        let cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, 0, z);
        scene.add(cube);
    }
}

camera.position.set(25, 20, 25);
camera.lookAt(25, 0, 25);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

