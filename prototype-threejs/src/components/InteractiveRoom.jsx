import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';

const InteractiveRoom = () => {
  const { scene } = useGLTF('/assets/room.glb');
  const [isLampOn, setLampOn] = useState(false);
  const [isDoorOpen, setDoorOpen] = useState(false);

  const toggleLamp = () => {
    setLampOn(!isLampOn);
  };

  const toggleDoor = () => {
    setDoorOpen(!isDoorOpen);
  };

  return (
    <primitive object={scene}>
      <mesh
        onClick={toggleLamp}
        position={[1, 2, 0]} 
      >
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color={isLampOn ? 'yellow' : 'gray'} />
      </mesh>

      <mesh
        onClick={toggleDoor}
        position={[-1, 0, 0]} 
      >
        <boxGeometry args={[0.2, 1, 2]} />
        <meshStandardMaterial color={isDoorOpen ? 'brown' : 'darkgray'} />
      </mesh>
    </primitive>
  );
};

export default InteractiveRoom;
