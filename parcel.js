import * as THREE from 'https://cdn.skypack.dev/three';

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

let selectedParcel = null;

// Kira ID parcel (contoh: berdasarkan posisi XZ dalam grid 100x100)
function getParcelID(position) {
  const x = Math.floor(position.x + 50); // offset to 0-100
  const z = Math.floor(position.z + 50);
  return `GRID-${x}-${z}`;
}

// Fungsi untuk detect klik
export function setupParcelInteraction(renderer, camera, scene) {
  window.addEventListener('click', (event) => {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      const intersect = intersects[0];

      const point = intersect.point;
      const id = getParcelID(point);

      selectedParcel = {
        id: id,
        position: point
      };

      showParcelInfo(id, point);
    }
  });
}

// Papar info parcel (boleh ganti dengan UI sebenar nanti)
function showParcelInfo(id, position) {
  const ui = document.getElementById('parcelInfo');
  if (ui) {
    ui.innerHTML = `
      <strong>Parcel Selected:</strong><br>
      ID: ${id}<br>
      Position: (${position.x.toFixed(2)}, ${position.z.toFixed(2)})<br>
      <button onclick="mintParcel('${id}')">Mint Parcel</button>
    `;
  }
}

// Placeholder fungsi mint
window.mintParcel = function(id) {
  alert(`Minting parcel ${id}... (Integrasi smart contract akan dibuat di wallet.js)`);
};
