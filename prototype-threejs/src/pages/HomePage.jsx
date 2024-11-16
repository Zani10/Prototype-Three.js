import React, { useState } from 'react';
import ThreeCanvas from '../components/Canvas';
import ModelViewer from '../components/ModelViewer';
import ObjectList from '../components/ObjectList';
import UploadModel from '../components/UploadModel';

const HomePage = () => {
  const [selectedModelPath, setSelectedModelPath] = useState(null);
  const [uploadedModels, setUploadedModels] = useState([]);
  const [view, setView] = useState("outside");
  const [leftDoorOpen, setLeftDoorOpen] = useState(false);
  const [rightDoorOpen, setRightDoorOpen] = useState(false);

  const handleUpload = (filePath) => {
    setUploadedModels([...uploadedModels, { name: `Model ${uploadedModels.length + 1}`, path: filePath }]);
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8">3D Object Viewer</h1>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setView("outside")}
          className="bg-gray-800 text-white px-4 py-2 rounded shadow-md transition duration-300 hover:bg-gray-700"
        >
          Outside View
        </button>
        <button
          onClick={() => setView("inside")}
          className="bg-gray-800 text-white px-4 py-2 rounded shadow-md transition duration-300 hover:bg-gray-700"
        >
          Inside View
        </button>
        <button
          onClick={() => setLeftDoorOpen(!leftDoorOpen)}
          className="bg-gray-800 text-white px-4 py-2 rounded shadow-md transition duration-300 hover:bg-gray-700"
        >
          Toggle Left Door
        </button>
        <button
          onClick={() => setRightDoorOpen(!rightDoorOpen)}
          className="bg-gray-800 text-white px-4 py-2 rounded shadow-md transition duration-300 hover:bg-gray-700"
        >
          Toggle Right Door
        </button>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-8">
        {/* Left Panel - Model List and Upload */}
        <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Available 3D Models</h2>
          <UploadModel onUpload={handleUpload} />
          <ObjectList onSelectModel={setSelectedModelPath} models={uploadedModels} />
        </div>

        {/* Right Panel - 3D Viewer */}
        <div className="w-full lg:w-2/3 bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center" style={{ minHeight: '500px' }}>
          <ThreeCanvas>
            {selectedModelPath && (
              <ModelViewer
                modelPath={selectedModelPath}
                view={view}
                leftDoorOpen={leftDoorOpen}
                rightDoorOpen={rightDoorOpen}
              />
            )}
          </ThreeCanvas>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
