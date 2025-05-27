import * as THREE from 'https://cdn.skypack.dev/three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 30, 50);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('tronCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tambah Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // warna putih, intensiti 0.5
scene.add(ambientLight);

// Tambah Point Light untuk sorotan
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 50, 50);
scene.add(pointLight);

// Lampu biru neon
const ambientLight = new THREE.AmbientLight(0x00ffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
pointLight.position.set(0, 50, 0);
scene.add(pointLight);

// Grid Tanah
const gridSize = 100;
const gridDivisions = 20;
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x00ffff, 0x00ffff);
scene.add(gridHelper);

// Lantai bercahaya
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x001122, side: THREE.DoubleSide, wireframe: true });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// Animasi
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
