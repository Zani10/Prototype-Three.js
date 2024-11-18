import React from 'react';

const ObjectList = ({ onSelectModel, models }) => {
  const predefinedModels = [{ name: 'Retro Car', path: '/assets/retro.glb' }];
  const allModels = [...predefinedModels, ...models];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Available Models</h2>
      <ul className="divide-y divide-gray-600">
        {allModels.map((model, index) => (
          <li
            key={index}
            className="cursor-pointer bg-gradient-to-r from-gray-700 to-gray-800 text-white p-4 rounded-md shadow-lg transition transform hover:scale-105 hover:shadow-xl"
            onClick={() => onSelectModel(model.path)}
          >
            <span className="font-medium">{model.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ObjectList;
