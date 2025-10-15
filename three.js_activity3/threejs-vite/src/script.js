import * as THREE from 'three';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.5, 3, 0.5);
const material = new THREE.MeshBasicMaterial({ color: 0xffa500 });

const pillar1 = new THREE.Mesh(geometry, material);
const pillar2 = new THREE.Mesh(geometry, material);
const pillar3 = new THREE.Mesh(geometry, material);

pillar1.position.x = -2;  
pillar2.position.x = 0;  
pillar3.position.x = 2;   

scene.add(pillar1, pillar2, pillar3);

const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 6;
camera.position.y = 1.5;
scene.add(camera);

const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
