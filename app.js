import * as THREE from 'https://cdn.skypack.dev/three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 30, 50);
camera.lookAt(0, 0, 0);

// Guna <canvas id="tronCanvas">
const canvas = document.getElementById('tronCanvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// === Cahaya ===
const ambientLight1 = new THREE.AmbientLight(0xffffff, 0.3); // cahaya lembut putih
scene.add(ambientLight1);

const ambientNeon = new THREE.AmbientLight(0x00ffff, 0.4); // neon biru
scene.add(ambientNeon);

const pointNeon = new THREE.PointLight(0x00ffff, 1, 100);
pointNeon.position.set(0, 50, 0);
scene.add(pointNeon);

// === Grid Tron ===
const gridSize = 100;
const gridDivisions = 20;
const gridHelper = new THREE.GridHelper(
  gridSize,
  gridDivisions,
  0x00ffff,
  0x00ffff
);
scene.add(gridHelper);

// === Lantai Tron ===
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshBasicMaterial({
  color: 0x001122,
  side: THREE.DoubleSide,
  wireframe: true,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// === Animasi ===
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
