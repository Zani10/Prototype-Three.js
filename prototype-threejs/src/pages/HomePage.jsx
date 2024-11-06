import React, { useState } from 'react';
import ThreeCanvas from '../components/Canvas';
import ModelViewer from '../components/ModelViewer';
import ObjectList from '../components/ObjectList';
import InteractiveRoom from '../components/InteractiveRoom';
import UploadModel from '../components/UploadModel';

const HomePage = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [uploadedModels, setUploadedModels] = useState([]);

  const handleUpload = (filePath) => {
    setUploadedModels([...uploadedModels, { name: `Model ${uploadedModels.length + 1}`, path: filePath }]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">3D Object Viewer</h1>
      <UploadModel onUpload={handleUpload} />
      <ObjectList onSelectModel={setSelectedModel} models={uploadedModels} />
      <ThreeCanvas>
        {selectedModel ? <ModelViewer modelPath={selectedModel} /> : <InteractiveRoom />}
      </ThreeCanvas>
    </div>
  );
};

export default HomePage;
