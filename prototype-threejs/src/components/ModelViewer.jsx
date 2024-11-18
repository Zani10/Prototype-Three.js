import React, { useEffect, useRef, useState } from 'react';
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
  const [lightPanels, setLightPanels] = useState([]);

  useEffect(() => {
    //  doors, steering wheel, and lights
    const lights = [];
    scene.traverse((object) => {
      if (object.name === 'left-door') leftDoorRef.current = object;
      if (object.name === 'right-door') rightDoorRef.current = object;
      if (object.name === 'steering_wheel') steeringWheelRef.current = object;
      if (object.name.includes('light_panel')) lights.push(object); // Adjust name based on the model
    });
    setLightPanels(lights);

    scene.rotation.y = -Math.PI / 6; 
  }, [scene]);

  // door rotation
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

  // camera position
  useEffect(() => {
    if (view === "outside") {
      camera.position.set(5, 2.5, 5); 
      orbitControlsRef.current.target.set(0, 1, 0); 
    } else if (view === "inside" && steeringWheelRef.current) {
      const steeringWheelPosition = new Vector3();
      steeringWheelRef.current.getWorldPosition(steeringWheelPosition);

      // camera in front of steering wheel
      camera.position.set(
        steeringWheelPosition.x - 1,
        steeringWheelPosition.y + 0.2,
        steeringWheelPosition.z
      );
      orbitControlsRef.current.target.copy(steeringWheelPosition);
    }

    camera.lookAt(orbitControlsRef.current.target);
    orbitControlsRef.current.update();
  }, [view, camera]);

  
  const toggleLight = (index) => {
    const light = lightPanels[index];
    if (light) light.visible = !light.visible;
  };

  
  const changeLightColor = (index, color) => {
    const light = lightPanels[index];
    if (light && light.material) light.material.color = new Color(color);
  };

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

      {/* Light Controls UI */}
      <div className="absolute bottom-10 left-10 space-y-4 bg-gray-800 bg-opacity-70 p-4 rounded-lg">
        {lightPanels.map((_, index) => (
          <div key={index} className="flex items-center space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
              onClick={() => toggleLight(index)}
            >
              Toggle Light {index + 1}
            </button>
            <input
              type="color"
              onChange={(e) => changeLightColor(index, e.target.value)}
              className="w-8 h-8 rounded border-none"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ModelViewer;
