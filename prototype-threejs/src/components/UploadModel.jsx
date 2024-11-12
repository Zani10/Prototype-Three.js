import React, { useState } from 'react';

const UploadModel = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const filePath = URL.createObjectURL(file); 
      onUpload(filePath); 
      setFile(null); 
    }
  };

  return (
    <div className="upload-model space-y-4">
      <input type="file" accept=".glb, .gltf" onChange={handleFileChange} className="text-white"/>
      <button 
        onClick={handleUpload} 
        disabled={!file} 
        className={`bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ${!file ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Upload Model
      </button>
    </div>
  );
};

export default UploadModel;
