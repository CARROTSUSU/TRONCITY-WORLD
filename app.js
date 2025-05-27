import * as THREE from 'https://cdn.skypack.dev/three';
import { Lensflare, LensflareElement } from 'https://cdn.skypack.dev/three/examples/jsm/objects/Lensflare.js';

// === Setup Scene ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 30, 50);
camera.lookAt(0, 0, 0);

const canvas = document.getElementById('tronCanvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// === Audio Guruh ===
const listener = new THREE.AudioListener();
camera.add(listener);

const thunderSound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('https://cdn.pixabay.com/download/audio/2022/03/16/audio_1461d3f5db.mp3', function (buffer) {
  thunderSound.setBuffer(buffer);
  thunderSound.setLoop(false);
  thunderSound.setVolume(0.8);
});

// === Langit Tron ===
const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
const skyMaterial = new THREE.MeshBasicMaterial({ color: 0x001144, side: THREE.BackSide });
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(sky);

// === Awan Hologram ===
const cloudTexture = new THREE.TextureLoader().load('https://i.ibb.co/vPDX9DW/clouds.png');
const cloudMaterial = new THREE.SpriteMaterial({ map: cloudTexture, color: 0x00ffff, transparent: true, opacity: 0.15 });
const clouds = [];

for (let i = 0; i < 25; i++) {
  const cloud = new THREE.Sprite(cloudMaterial.clone());
  cloud.position.set(Math.random() * 200 - 100, 40 + Math.random() * 20, Math.random() * 200 - 100);
  cloud.scale.set(80, 80, 1);
  scene.add(cloud);
  clouds.push(cloud);
}

// === Cahaya ===
scene.add(new THREE.AmbientLight(0xffffff, 0.3)); // putih lembut
scene.add(new THREE.AmbientLight(0x00ffff, 0.4)); // neon biru

const pointNeon = new THREE.PointLight(0x00ffff, 1, 100);
pointNeon.position.set(0, 50, 0);
scene.add(pointNeon);

// === Petir ===
const lightning = new THREE.SpotLight(0x00ffff, 0, 300, Math.PI / 4, 0.5);
lightning.position.set(0, 80, 0);
scene.add(lightning);

// === Lens Flare ===
const flareTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/lensflare/lensflare0.png');
const lensflare = new Lensflare();
lensflare.addElement(new LensflareElement(flareTexture, 150, 0));
lightning.add(lensflare);

// === Grid Tron ===
const gridHelper = new THREE.GridHelper(100, 20, 0x00ffff, 0x00ffff);
scene.add(gridHelper);

// === Lantai Tron ===
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x001122, side: THREE.DoubleSide, wireframe: true });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// === Petir Flash Control ===
let flashTime = 0;
function triggerLightning() {
  if (Math.random() < 0.01) {
    lightning.intensity = 5 + Math.random() * 5;
    flashTime = 5;

    if (thunderSound.isPlaying) thunderSound.stop();
    thunderSound.play();
  }

  if (flashTime > 0) {
    flashTime--;
    lensflare.visible = true;
  } else {
    lightning.intensity = 0;
    lensflare.visible = false;
  }
}

// === Animasi ===
function animate() {
  requestAnimationFrame(animate);

  // Gerakkan awan
  clouds.forEach(cloud => {
    cloud.position.x += 0.02;
    if (cloud.position.x > 100) cloud.position.x = -100;
  });

  triggerLightning();
  renderer.render(scene, camera);
}
animate();
