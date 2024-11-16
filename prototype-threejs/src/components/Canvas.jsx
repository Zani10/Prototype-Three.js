import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { RectAreaLight, Color } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';

const Showroom = () => {
  const { scene } = useGLTF('/assets/studio_v1_for_car.glb');
  return <primitive object={scene} scale={2.5} />;
};

const ThreeCanvas = ({ children }) => {
  
  const lightRefs = useRef([]);

  useEffect(() => {
    
    lightRefs.current.forEach((light) => {
      if (light && light.isRectAreaLight) {
        const helper = new RectAreaLightHelper(light);
        light.add(helper); 
        helper.update();
      }
    });
  }, []);

  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 50 }} shadows>
      
      <ambientLight intensity={0.1} color="#ffffff" />

      
      <rectAreaLight
        ref={(el) => (lightRefs.current[0] = el)}
        width={15}
        height={1}
        intensity={10}
        position={[5, 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        color={new Color('white')}
      />
      <rectAreaLight
        ref={(el) => (lightRefs.current[1] = el)}
        width={15}
        height={1}
        intensity={10}
        position={[-5, 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        color={new Color('white')}
      />
      <rectAreaLight
        ref={(el) => (lightRefs.current[2] = el)}
        width={15}
        height={1}
        intensity={10}
        position={[0, 2, 5]}
        rotation={[0, Math.PI, 0]}
        color={new Color('white')}
      />
      <rectAreaLight
        ref={(el) => (lightRefs.current[3] = el)}
        width={15}
        height={1}
        intensity={10}
        position={[0, 2, -5]}
        color={new Color('white')}
      />

      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.8} />
      </mesh>

      
      <Showroom />

      
      {children}

      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
};

export default ThreeCanvas;
