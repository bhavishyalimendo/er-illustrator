import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import EntityNode from "./EntityNode";

// Register custom node types
const nodeTypes = {
  entityNode: EntityNode,
};

// For debugging
console.log("Registered nodeTypes:", nodeTypes);
console.log("EntityNode component:", EntityNode);

const EntityDiagram = ({ initialEntities = [], initialRelations = [] }) => {
  const [selectedEntity, setSelectedEntity] = useState(null);

  // Reference to the flow instance
  const reactFlowInstance = useRef(null);

  // Handle entity click for modal
  const handleEntityClick = (entityId) => {
    const entity = initialEntities.find((e) => e.id === entityId);
    if (entity) {
      setSelectedEntity(entity);
    }
  };

  // Close modal
  const closeModal = () => {
    setSelectedEntity(null);
  };

  // Zoom to fit function
  const onZoomToFit = useCallback(() => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.fitView({ padding: 0.2 });
    }
  }, []);

  // Center view function
  const onCenter = useCallback(() => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.setViewport({ x: 0, y: 0, zoom: 1 });
    }
  }, []);

  // Convert entities to nodes
  const initialNodes = initialEntities.map((entity) => {
    console.log("Processing entity:", entity);
    return {
      id: entity.id,
      type: "entityNode",
      position: entity.position || { x: 100, y: 100 }, // Provide default position if missing
      data: {
        id: entity.id,
        title: entity.title,
        fields: entity.fields || [],
        description: entity.description,
        onEntityClick: handleEntityClick,
      },
    };
  });

  // Convert relations to edges
  const initialEdges = initialRelations.map((relation, index) => ({
    id: `e${index}`,
    source: relation.source,
    target: relation.target,
    label: relation.label,
    type: "default",
    animated: true,
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handle new connections
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <>
      <div className="w-full h-[90vh] border border-gray-300 rounded-lg overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          panOnScroll={true}
          panOnScrollMode="free"
          zoomOnScroll={true}
          draggable={true}
          selectionOnDrag={true}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          minZoom={0.1}
          maxZoom={2.5}
          onInit={(setInstance) => {
            console.log("ReactFlow initialized with instance:", setInstance);
            reactFlowInstance.current = setInstance;
            // Force a re-render of the nodes
            setTimeout(() => {
              if (reactFlowInstance.current) {
                reactFlowInstance.current.fitView({ padding: 0.2 });
              }
            }, 100);
          }}
        >
          {/* <Controls /> */}
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
          <Panel
            position="top-right"
            className="bg-white p-2 rounded shadow-md"
          >
            <div className="flex flex-col space-y-2">
              <button
                onClick={onZoomToFit}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Zoom to Fit
              </button>
              <button
                onClick={onCenter}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
              >
                Center View
              </button>
            </div>
          </Panel>

          {/* <Panel position="bottom-left" className="bg-white p-3 rounded shadow-md text-sm max-w-xs">
          <div className="text-gray-700">
            <h3 className="font-bold mb-2">Navigation Help:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Drag the canvas to move around</li>
              <li>Scroll to zoom in/out</li>
              <li>Drag entities to reposition them</li>
              <li>Click on an entity to view details</li>
            </ul>
          </div>
        </Panel> */}
        </ReactFlow>

        {/* Modal for special entity */}
        {selectedEntity && selectedEntity.id === "special-entity" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{selectedEntity.title}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                {selectedEntity.fields.map((field, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b pb-2"
                  >
                    <span>{field.name}</span>
                    <span className="text-gray-500">{field.type}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EntityDiagram;
