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
  const { camera } = useThree();
  const orbitControlsRef = useRef();

  useEffect(() => {
    // Locate doors and steering wheel in the model
    scene.traverse((object) => {
      if (object.name === 'left-door') leftDoorRef.current = object;
      else if (object.name === 'right-door') rightDoorRef.current = object;
      else if (object.name === 'steering_wheel') steeringWheelRef.current = object;
    });
  }, [scene]);

  // Apply door rotations based on props
  useEffect(() => {
    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = leftDoorOpen ? -Math.PI / 3 : 0;
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = rightDoorOpen ? Math.PI / 3 : 0;
    }
  }, [leftDoorOpen, rightDoorOpen]);

  // Set camera position when view changes
  useEffect(() => {
    if (view === "outside") {
      camera.position.set(5, 2.5, 5); // Outside view
      orbitControlsRef.current.target.set(0, 1, 0); // Target center of the model
    } else if (view === "inside" && steeringWheelRef.current) {
      const steeringWheelPosition = new Vector3();
      steeringWheelRef.current.getWorldPosition(steeringWheelPosition);

      // Set camera in front of the steering wheel
      camera.position.set(
        steeringWheelPosition.x + -1,
        steeringWheelPosition.y + 0.2, // Slightly above the wheel
        steeringWheelPosition.z + 0  // In front of the wheel
      );
      orbitControlsRef.current.target.copy(steeringWheelPosition); // Set target to steering wheel
    }

    camera.lookAt(orbitControlsRef.current.target); // Ensure the camera looks at the target
    orbitControlsRef.current.update(); // Update controls to apply new target
  }, [view, camera]);

  return (
    <>
      {/* Model and persistent OrbitControls */}
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
