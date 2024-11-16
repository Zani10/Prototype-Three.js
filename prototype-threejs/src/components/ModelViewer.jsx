import React, { useEffect, useRef } from 'react';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Vector3, Color } from 'three';

const ModelViewer = ({ modelPath, view, leftDoorOpen, rightDoorOpen }) => {
  if (!modelPath) return null;

  const { scene } = useGLTF(modelPath);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const steeringWheelRef = useRef(null);
  const { camera } = useThree();
  const orbitControlsRef = useRef();

  useEffect(() => {
    // doors, steering wheel, and lights
    scene.traverse((object) => {
      if (object.name === 'left-door') leftDoorRef.current = object;
      else if (object.name === 'right-door') rightDoorRef.current = object;
      else if (object.name === 'steering_wheel') steeringWheelRef.current = object;
      
      
      if (object.name === 'light_lights_0' || object.name === 'light up_lights_0') {
        object.intensity = 5; 
        object.color = new Color('#ffffff'); 
        object.castShadow = true; 
      }
    });
  }, [scene]);

  // door rotation
  useEffect(() => {
    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = leftDoorOpen ? -Math.PI / 3 : 0;
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = rightDoorOpen ? Math.PI / 3 : 0;
    }
  }, [leftDoorOpen, rightDoorOpen]);

  // camera position when view changes
  useEffect(() => {
    if (view === "outside") {
      camera.position.set(5, 2.5, 5); 
      orbitControlsRef.current.target.set(0, 1, 0); 
    } else if (view === "inside" && steeringWheelRef.current) {
      const steeringWheelPosition = new Vector3();
      steeringWheelRef.current.getWorldPosition(steeringWheelPosition);

      // Set camera in front of the steering wheel
      camera.position.set(
        steeringWheelPosition.x + -1,
        steeringWheelPosition.y + 0.2, 
        steeringWheelPosition.z + 0  
      );
      orbitControlsRef.current.target.copy(steeringWheelPosition);
    }

    camera.lookAt(orbitControlsRef.current.target); 
    orbitControlsRef.current.update(); 
  }, [view, camera]);

  return (
    <>
      <primitive object={scene} scale={1.5} />
      <OrbitControls
        ref={orbitControlsRef}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        makeDefault
      />
    </>
  );
};

export default ModelViewer;
