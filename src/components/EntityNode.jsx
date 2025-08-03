import React from "react";
import { Handle, Position } from "reactflow";
import Entity from "./Entity";

// For debugging
console.log("EntityNode component loaded");

const EntityNode = ({ data, isConnectable }) => {
  // console.log('EntityNode rendering with data:', data);
  return (
    <div style={{ zIndex: 10, position: "relative" }}>
      {/* Debug element */}
      <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
        {data.id}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{ zIndex: 20 }}
      />
      <div style={{ position: "relative", zIndex: 15 }}>
        <Entity
          id={data.id}
          title={data.title}
          fields={data.fields}
          onEntityClick={data.onEntityClick}
        />
      </div>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ zIndex: 20 }}
      />
    </div>
  );
};

export default EntityNode;
