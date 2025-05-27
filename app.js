import * as THREE from 'https://cdn.skypack.dev/three';
import { Lensflare, LensflareElement } from 'https://cdn.skypack.dev/three/examples/jsm/objects/Lensflare.js';

// Detect mobile
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// Scene setup
const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 30, 50);
camera.lookAt(0, 0, 0);

const canvas = document.getElementById('tronCanvas');
const scaleFactor = isMobile ? 0.8 : 1;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile });
renderer.setSize(window.innerWidth * scaleFactor, window.innerHeight * scaleFactor);
renderer.setPixelRatio(window.devicePixelRatio * scaleFactor);

// Shared Elements
const gridHelper = new THREE.GridHelper(100, 20, 0x00ffff, 0x00ffff);
scene.add(gridHelper);

const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshBasicMaterial({
  color: 0x001122,
  side: THREE.DoubleSide,
  wireframe: true
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.3));
scene.add(new THREE.AmbientLight(0x00ffff, 0.4));
const pointNeon = new THREE.PointLight(0x00ffff, 1, 100);
pointNeon.position.set(0, 50, 0);
scene.add(pointNeon);

// Cloud Setup
const cloudTexture = new THREE.TextureLoader().load('https://i.ibb.co/vPDX9DW/clouds.png');
const cloudMaterial = new THREE.SpriteMaterial({ map: cloudTexture, color: 0x00ffff, transparent: true, opacity: 0.15 });
const clouds = [];
const cloudCount = isMobile ? 8 : 25;
for (let i = 0; i < cloudCount; i++) {
  const cloud = new THREE.Sprite(cloudMaterial.clone());
  cloud.position.set(Math.random() * 200 - 100, 40 + Math.random() * 20, Math.random() * 200 - 100);
  cloud.scale.set(80, 80, 1);
  scene.add(cloud);
  clouds.push(cloud);
}

// Mobile or PC Specific Setup
if (!isMobile) {
  // Sky Sphere
  const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
  const skyMaterial = new THREE.MeshBasicMaterial({ color: 0x001144, side: THREE.BackSide });
  const sky = new THREE.Mesh(skyGeometry, skyMaterial);
  scene.add(sky);

  // Lightning + Lensflare
  const lightning = new THREE.SpotLight(0x00ffff, 0, 300, Math.PI / 4, 0.5);
  lightning.position.set(0, 80, 0);
  scene.add(lightning);

  const flareTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/lensflare/lensflare0.png');
  const lensflare = new Lensflare();
  lensflare.addElement(new LensflareElement(flareTexture, 150, 0));
  lightning.add(lensflare);

  // Sound setup
  const listener = new THREE.AudioListener();
  camera.add(listener);
  const thunderSound = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load('https://cdn.pixabay.com/download/audio/2022/03/16/audio_1461d3f5db.mp3', function (buffer) {
    thunderSound.setBuffer(buffer);
    thunderSound.setLoop(false);
    thunderSound.setVolume(0.8);
  });

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

  function animatePC() {
    requestAnimationFrame(animatePC);
    clouds.forEach(c => {
      c.position.x += 0.02;
      if (c.position.x > 100) c.position.x = -100;
    });
    triggerLightning();
    renderer.render(scene, camera);
  }
  animatePC();

} else {
  // Mobile Optimization
  renderer.setClearColor(new THREE.Color(0x000010)); // simpler background

  function animateMobile() {
    requestAnimationFrame(animateMobile);
    clouds.forEach(c => {
      c.position.x += 0.01;
      if (c.position.x > 100) c.position.x = -100;
    });
    renderer.render(scene, camera);
  }
  animateMobile();
}

// Resize Handling
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth * scaleFactor, window.innerHeight * scaleFactor);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
