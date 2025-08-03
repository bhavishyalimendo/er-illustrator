import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import airportData from '../data/airportData.json';

const EntityDetail = () => {
  const { id } = useParams();
  const [entity, setEntity] = useState(null);
  
  useEffect(() => {
    // Find the entity in our airport data
    const foundEntity = airportData.entities.find(e => e.id === id);
    if (foundEntity) {
      setEntity(foundEntity);
    } else {
      // Default entity if not found
      setEntity({
        id,
        title: 'Unknown Entity',
        fields: [],
        description: 'Entity details not found.',
      });
    }
  }, [id]);

  if (!entity) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Link to={ROUTES.HOME} className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Diagram
      </Link>
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-4">
        <h1 className="text-2xl font-bold mb-2">{entity.title}</h1>
        <p className="text-gray-600 mb-6">{entity.description}</p>
        
        <h2 className="text-xl font-semibold mb-3">Fields</h2>
        <div className="bg-gray-50 rounded-md p-4">
          {entity.fields && entity.fields.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {entity.fields.map((field, index) => (
                  <tr key={index} className="border-b border-gray-200 last:border-0">
                    <td className="py-2">{field.name}</td>
                    <td className="py-2 text-gray-600">{field.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No fields available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityDetail;