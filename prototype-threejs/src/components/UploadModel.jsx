import React, { useState } from 'react';

const UploadModel = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [modelName, setModelName] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file && modelName) {
      const filePath = URL.createObjectURL(file);
      onUpload({ name: modelName, path: filePath });
      setFile(null);
      setModelName('');
    }
  };

  return (
    <div className="space-y-6 mt-6">
      <input
        type="text"
        placeholder="Model Name"
        value={modelName}
        onChange={(e) => setModelName(e.target.value)}
        className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="file"
        accept=".glb, .gltf"
        onChange={handleFileChange}
        className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleUpload}
        disabled={!file || !modelName}
        className={`w-full bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105 ${
          !file || !modelName ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Upload Model
      </button>
    </div>
  );
};

export default UploadModel;
