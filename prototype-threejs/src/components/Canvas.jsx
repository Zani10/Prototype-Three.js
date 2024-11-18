import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Showroom = () => {
  const { scene } = useGLTF('/assets/studio_v1_for_car.glb');
  return <primitive object={scene} scale={2.5} />;
};

const ThreeCanvas = ({ children }) => {
  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 50 }} shadows className="absolute inset-0">
      <ambientLight intensity={0.2} />

      {/* Showroom */}
      <Showroom />

      {/* Load Children/cars */}
      {children}

      {/* Camera Controls */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
};

export default ThreeCanvas;
