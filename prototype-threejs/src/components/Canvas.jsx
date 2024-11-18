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
      <spotLight position={[5, 10, 5]} intensity={1.5} angle={0.3} penumbra={1} castShadow />
      <spotLight position={[-5, 10, 5]} intensity={1.5} angle={0.3} penumbra={1} castShadow />
      
      {/* Reflective Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Showroom */}
      <Showroom />

      {/* Load Children */}
      {children}

      {/* Camera Controls */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
};

export default ThreeCanvas;
