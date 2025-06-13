import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './AvatarSelector.css';

const avatarList = [
  'avatar1.glb',
  'avatar2.glb',
  'avatar3.glb',
  'avatar4.glb',
  'avatar5.glb',
  'avatar6.glb',
];

function AvatarPreview({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1.2} position={[0, -1.3, 0]} />;
}

export default function AvatarSelector({ onSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const modelPath = `/models/avatars/${avatarList[currentIndex]}`;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + avatarList.length) % avatarList.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % avatarList.length);
  };

  return (
    <div className="avatar-selector-container">
      <h1>Choose Your Avatar</h1>

      <div className="avatar-canvas-wrapper">
        <button onClick={handlePrev} className="nav-arrow left">
          <ChevronLeft size={28} />
        </button>

        <Canvas camera={{ position: [0, 1.5, 3], fov: 35 }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[2, 2, 5]} intensity={1} />
          <Suspense fallback={null}>
            <AvatarPreview modelPath={modelPath} />
            <Environment preset="sunset" />
          </Suspense>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>

        <button onClick={handleNext} className="nav-arrow right">
          <ChevronRight size={28} />
        </button>
      </div>

      <p className="avatar-index">Avatar {currentIndex + 1}</p>

      <button onClick={() => onSelect(modelPath)} className="select-button">
        Select Avatar
      </button>
    </div>
  );
}
