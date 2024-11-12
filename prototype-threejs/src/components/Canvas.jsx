import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, SpotLight, Sky } from '@react-three/drei';

const ThreeCanvas = ({ children }) => {
  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
      <SpotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
      <Sky sunPosition={[10, 10, 10]} />
      <Environment preset="city" />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      {children}
    </Canvas>
  );
};

export default ThreeCanvas;
