import React from 'react';

const ObjectList = ({ onSelectModel, models }) => {
  const predefinedModels = [
    { name: 'Sample Model 1', path: '/assets/model1.glb' },
    { name: 'Sample Model 2', path: '/assets/model2.glb' },
  ];

  const allModels = [...predefinedModels, ...models];

  return (
    <div className="object-list">
      <h2 className="text-lg font-bold mb-2">Available 3D Models</h2>
      <ul>
        {allModels.map((model, index) => (
          <li
            key={index}
            className="cursor-pointer hover:text-blue-500"
            onClick={() => onSelectModel(model.path)}
          >
            {model.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ObjectList;
