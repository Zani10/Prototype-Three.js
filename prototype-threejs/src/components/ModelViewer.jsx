import React, { useEffect, useRef } from 'react';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

const ModelViewer = ({ modelPath, view, leftDoorOpen, rightDoorOpen }) => {
  if (!modelPath) return null;

  const { scene } = useGLTF(modelPath);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const steeringWheelRef = useRef(null);
  const { camera, gl } = useThree();
  const orbitControlsRef = useRef();

  useEffect(() => {
    // find doors
    scene.traverse((object) => {
      if (object.name === 'left-door') leftDoorRef.current = object;
      if (object.name === 'right-door') rightDoorRef.current = object;
      if (object.name === 'steering_wheel') steeringWheelRef.current = object;
    });

    // Rotate car
    scene.rotation.y = -Math.PI / 3; 

    // car position
    scene.position.set(-1, 0, 0);

    // Material reflections
    scene.traverse((object) => {
      if (object.isMesh) {
        object.material.metalness = 0.8;
        object.material.roughness = 0.2;
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  // Door rotation animation
  useEffect(() => {
    const smoothRotate = (door, targetAngle) => {
      if (!door) return;
      const duration = 300; 
      const step = 10; 
      const angleStep = (targetAngle - door.rotation.y) / step;
      let currentStep = 0;

      const interval = setInterval(() => {
        if (currentStep < step) {
          door.rotation.y += angleStep;
          currentStep++;
        } else {
          clearInterval(interval); 
        }
      }, duration / step);
    };

    smoothRotate(leftDoorRef.current, leftDoorOpen ? -Math.PI / 3 : 0);
    smoothRotate(rightDoorRef.current, rightDoorOpen ? Math.PI / 3 : 0);
  }, [leftDoorOpen, rightDoorOpen]);

  // camera position when view changes
  useEffect(() => {
    if (view === "outside") {
      camera.position.set(0, 2, 8);
      orbitControlsRef.current.target.set(0, 1, 0);
    } else if (view === "inside" && steeringWheelRef.current) {
      const steeringWheelPosition = new Vector3();
      steeringWheelRef.current.getWorldPosition(steeringWheelPosition);

      // Position camera in front of steering wheel
      camera.position.set(
        steeringWheelPosition.x ,
        steeringWheelPosition.y + 0.5,
        steeringWheelPosition.z - 1
      );
      orbitControlsRef.current.target.copy(steeringWheelPosition);
    }

    camera.lookAt(orbitControlsRef.current.target);
    orbitControlsRef.current.update();
  }, [view, camera]);

  return (
    <>
      <ambientLight intensity={5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
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
