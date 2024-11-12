import React from 'react';

const ObjectList = ({ onSelectModel, models }) => {
  const predefinedModels = [
    { name: 'Retro Car', path: '/assets/retro.glb' }
  ];

  const allModels = [...predefinedModels, ...models];

  return (
    <div className="object-list space-y-4">
      <ul className="divide-y divide-gray-700 mt-3">
        {allModels.map((model, index) => (
          <li
            key={index}
            className="mt-3 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-md shadow-md transition duration-150 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            onClick={() => onSelectModel(model.path)}
          >
            <span className="font-semibold">{model.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ObjectList;
