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

  const handleUpload = ({ name, path }) => {
    setUploadedModels([...uploadedModels, { name, path }]);
  };

  const handleModelChange = (path) => {
    setSelectedModelPath(null);
    setTimeout(() => setSelectedModelPath(path), 300); 
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white relative">
      {/* Viewer */}
      <div className="absolute inset-0 z-0">
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

      {/* Title */}
      <h1 className="absolute top-4 left-4 text-3xl font-bold z-10">InterCar</h1>

      {/* Object List */}
      <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-80 p-4 rounded-md shadow-lg w-64 z-10">
        <ObjectList onSelectModel={handleModelChange} models={uploadedModels} />
        <UploadModel onUpload={handleUpload} />
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 w-full flex justify-center gap-4 z-10">
        <button
          onClick={() => setView("outside")}
          className={`px-4 py-2 rounded shadow-md transition duration-300 ${
            view === "outside" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
        >
          Outside View
        </button>
        <button
          onClick={() => setView("inside")}
          className={`px-4 py-2 rounded shadow-md transition duration-300 ${
            view === "inside" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
        >
          Inside View
        </button>
        <button
          onClick={() => setLeftDoorOpen(!leftDoorOpen)}
          className={`px-4 py-2 rounded shadow-md transition duration-300 ${
            leftDoorOpen ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
        >
          Toggle Left Door
        </button>
        <button
          onClick={() => setRightDoorOpen(!rightDoorOpen)}
          className={`px-4 py-2 rounded shadow-md transition duration-300 ${
            rightDoorOpen ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
        >
          Toggle Right Door
        </button>
      </div>
    </div>
  );
};

export default HomePage;
