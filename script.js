// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xcccccc); // Set scene background color to light gray
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040, 8); // Soft light with increased intensity
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // Directional light with increased intensity
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Load the 3D model
const loader = new THREE.GLTFLoader();
loader.load('./slr_ar-15.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(25, 25, 25); // Increase the model size further
    model.position.set(0, 0, 0); // Center the model in the scene
    scene.add(model);
}, undefined, (error) => {
    console.error('Error loading model:', error);
});

// Add orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add smooth damping
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

// Position the camera to view the model from the side
camera.position.set(20, 10, 20); // Camera placed to the side and above
camera.lookAt(0, 0, 0); // Camera focuses on the center of the scene

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera); // Render the scene
}
animate();


