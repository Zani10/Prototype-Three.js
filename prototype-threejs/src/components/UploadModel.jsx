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
    <div className="upload-model">
      <input type="file" accept=".glb, .gltf" onChange={handleFileChange} />
      <button 
        onClick={handleUpload} 
        disabled={!file} 
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        Upload Model
      </button>
    </div>
  );
};

export default UploadModel;
