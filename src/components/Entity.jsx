import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getEntityDetailPath } from '../routes';

const Entity = ({ id, title, fields = [], onEntityClick }) => {
  console.log('Entity component rendering with props:', { id, title, fields });
  const navigate = useNavigate();

  const handleClick = (e) => {
    // Stop propagation to allow dragging
    e.stopPropagation();
    onEntityClick(id);
    
    // if (id === 'special-entity') {
    //   // Open modal for special entity
    //   onEntityClick(id);
    // } else {
    //   // Navigate to entity detail page using route helper
    //   navigate(getEntityDetailPath(id));
    // }
  };

  return (
    <div 
      className="bg-white rounded-md shadow-md p-4 w-64 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="font-bold text-lg border-b pb-2 mb-2">{title}</div>
      <div className="space-y-1">
        {fields.map((field, index) => (
          <div key={index} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
            <span className="text-sm font-medium">{field.name}</span>
            <span className="text-xs text-gray-500">{field.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entity;