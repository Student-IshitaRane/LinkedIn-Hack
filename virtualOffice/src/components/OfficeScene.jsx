import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default function OfficeScene({ avatarPath }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.8, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    loader.setDRACOLoader(dracoLoader);

    const modelList = [
      { path: '/models/floor.glb', position: [0, 0, 0] },
      { path: '/models/tables.glb', position: [2, 0, -2] },
      { path: '/models/screen.glb', position: [-1, 0, 1] },
      { path: '/models/buildings.glb', position: [0, 0, -5] },
      { path: '/models/glass.glb', position: [0, 0, 2] },
      { path: '/models/thirdfloor.glb', position: [3, 0, 3] },
    ];

    modelList.forEach((model) => {
      loader.load(model.path, (gltf) => {
        const obj = gltf.scene;
        obj.position.set(...model.position);
        scene.add(obj);
      });
    });

    let avatar;
    let keys = {};
    const velocity = new THREE.Vector3();

    loader.load(avatarPath, (gltf) => {
      avatar = gltf.scene;
      avatar.position.set(0, 0, 0);
      avatar.scale.set(1.5, 1.5, 1.5);
      scene.add(avatar);

      document.addEventListener('keydown', (e) => (keys[e.key.toLowerCase()] = true));
      document.addEventListener('keyup', (e) => (keys[e.key.toLowerCase()] = false));

      const clock = new THREE.Clock();

      const animate = () => {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        velocity.set(0, 0, 0);

        if (keys['arrowup'] || keys['w']) velocity.z -= 1;
        if (keys['arrowdown'] || keys['s']) velocity.z += 1;
        if (keys['arrowleft'] || keys['a']) velocity.x -= 1;
        if (keys['arrowright'] || keys['d']) velocity.x += 1;

        velocity.normalize().multiplyScalar(2 * delta); // Speed control

        avatar.position.add(velocity);

        // Optional: make avatar look in movement direction
        if (velocity.lengthSq() > 0) {
          const angle = Math.atan2(velocity.x, velocity.z);
          avatar.rotation.y = angle;
        }

        // Camera follows the avatar
        camera.position.lerp(
          new THREE.Vector3(avatar.position.x, avatar.position.y + 2, avatar.position.z + 5),
          0.1
        );
        camera.lookAt(avatar.position);

        renderer.render(scene, camera);
      };

      animate();
    });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (renderer && mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [avatarPath]);

  return <div ref={mountRef} className="w-full h-screen" />;
}
