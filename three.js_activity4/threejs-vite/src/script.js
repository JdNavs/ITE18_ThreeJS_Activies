import * as THREE from 'three';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.5, 3, 0.5);

const material1 = new THREE.MeshBasicMaterial({ color: 0xffa500 });
const material2 = new THREE.MeshBasicMaterial({ color: 0x00aaff });
const material3 = new THREE.MeshBasicMaterial({ color: 0x00ff55 }); 

const pillar1 = new THREE.Mesh(geometry, material1);
const pillar2 = new THREE.Mesh(geometry, material2);
const pillar3 = new THREE.Mesh(geometry, material3);

pillar1.position.x = -2;
pillar2.position.x = 0;
pillar3.position.x = 2;

scene.add(pillar1, pillar2, pillar3);

const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 7;
camera.position.y = 1.5;
scene.add(camera);

const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

function animate() {
  requestAnimationFrame(animate);

  pillar1.rotation.y += 0.01;
  pillar2.rotation.y += 0.02;
  pillar3.rotation.y += 0.03;

  const time = Date.now() * 0.002;
  pillar1.position.y = Math.sin(time) * 0.5 + 0.5;
  pillar2.position.y = Math.sin(time + 1) * 0.5 + 0.5;
  pillar3.position.y = Math.sin(time + 2) * 0.5 + 0.5;

  renderer.render(scene, camera);
}

animate();
