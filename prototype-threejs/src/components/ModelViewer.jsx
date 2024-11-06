import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ModelViewer = ({ modelPath }) => {
  const model = useLoader(GLTFLoader, modelPath);

  return <primitive object={model.scene} scale={1.5} />;
};

export default ModelViewer;
