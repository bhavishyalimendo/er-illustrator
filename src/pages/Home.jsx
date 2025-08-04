import React from "react";
import EntityDiagram from "../components/EntityDiagram";
import airportData from "../data/airportData.json";

const Home = () => {
  console.log("Home component rendering with airportData:", airportData);

  return (
    <div className="container-xl mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-6">Airport Security System</h1> */}
      {/* <p className="text-gray-600 mb-6">Interactive diagram of airport security components and their relationships.</p>       */}
      <EntityDiagram
        initialEntities={airportData.entities}
        initialRelations={airportData.relations}
      />
    </div>
  );
};

export default Home;
