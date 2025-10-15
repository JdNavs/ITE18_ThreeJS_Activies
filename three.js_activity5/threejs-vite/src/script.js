import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const largeGeometry = new THREE.BoxGeometry(3, 3, 3);
const baseMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0x000000,
  emissiveIntensity: 1.5,
  metalness: 0.8,
  roughness: 0.2
});

const centerCube = new THREE.Mesh(largeGeometry, baseMaterial.clone());
scene.add(centerCube);

const smallGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const smallCubes = [];

const positions = [
  new THREE.Vector3(-4, 0, 0), 
  new THREE.Vector3(4, 0, 0),  
  new THREE.Vector3(0, 0, -4), 
  new THREE.Vector3(0, 0, 4), 
  new THREE.Vector3(0, 4, 0), 
  new THREE.Vector3(0, -4, 0) 
];


positions.forEach(pos => {
  const cube = new THREE.Mesh(smallGeometry, baseMaterial.clone());
  cube.position.copy(pos);
  scene.add(cube);
  smallCubes.push(cube);
});

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.6,
    roughness: 0.2
  })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -5;
scene.add(floor);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(10, 6, 10);
scene.add(camera);

const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

let hue = 0;

function animate() {
  requestAnimationFrame(animate);

  centerCube.rotation.x += 0.01;
  centerCube.rotation.y += 0.02;

  smallCubes.forEach((cube, i) => {
    cube.rotation.x += 0.015 + i * 0.001;
    cube.rotation.y += 0.02 + i * 0.001;
  });

  hue += 0.01;
  if (hue > 1) hue = 0;

  const glow = 0.7 + Math.abs(Math.sin(Date.now() * 0.003)) * 0.3;

  [centerCube, ...smallCubes].forEach(cube => {
    cube.material.color.setHSL(hue, 1.0, 0.5);
    cube.material.emissive.setHSL(hue, 1.0, 0.4);
    cube.material.emissiveIntensity = glow * 2;
  });

  controls.update();
  renderer.render(scene, camera);
}

animate();
