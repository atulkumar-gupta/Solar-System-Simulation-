const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('solarCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

const light = new THREE.PointLight(0xffffff, 2, 100);
scene.add(light);
const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const planets = [
  { name: 'Mercury', distance: 5, size: 0.3, color: 0xaaaaaa, orbitSpeed: 0.02 },
  { name: 'Venus', distance: 7, size: 0.5, color: 0xffc0cb, orbitSpeed: 0.015 },
  { name: 'Earth', distance: 9, size: 0.6, color: 0x0000ff, orbitSpeed: 0.012 },
  { name: 'Mars', distance: 11, size: 0.5, color: 0xff4500, orbitSpeed: 0.01 },
  { name: 'Jupiter', distance: 14, size: 1.2, color: 0xd2b48c, orbitSpeed: 0.007 },
  { name: 'Saturn', distance: 17, size: 1, color: 0xf5deb3, orbitSpeed: 0.005 },
  { name: 'Uranus', distance: 20, size: 0.9, color: 0x00ffff, orbitSpeed: 0.003 },
  { name: 'Neptune', distance: 23, size: 0.9, color: 0x0000cd, orbitSpeed: 0.002 }
];

const planetMeshes = [];

planets.forEach((planet) => {
  const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: planet.color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  planet.angle = Math.random() * Math.PI * 2;
  planet.mesh = mesh;
  planetMeshes.push(planet);

  const input = document.createElement('input');
  input.type = 'range';
  input.min = '0.001';
  input.max = '0.05';
  input.step = '0.001';
  input.value = planet.orbitSpeed;
  input.title = planet.name;
  input.addEventListener('input', (e) => {
    planet.orbitSpeed = parseFloat(e.target.value);
  });
  document.getElementById('controls').appendChild(input);
});

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  planetMeshes.forEach((planet) => {
    planet.angle += planet.orbitSpeed;
    planet.mesh.position.set(
      Math.cos(planet.angle) * planet.distance,
      0,
      Math.sin(planet.angle) * planet.distance
    );
  });
  renderer.render(scene, camera);
}

animate();
