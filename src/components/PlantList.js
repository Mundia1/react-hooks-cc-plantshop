import React from "react";
import PlantCard from "./PlantCard";

// PlantList component responsible for rendering a list of PlantCard components
// It receives an array of plant objects as a prop named 'plants'
function PlantList({ plants }) {
  return (
    <ul className="cards">
      {/* Use the map method to iterate over the 'plants' array */}
      {/* For each 'plant' object in the array, render a PlantCard component */}
      {plants.map(plant => (
        // Render a PlantCard component
        // Pass the individual 'plant' object as a prop to PlantCard
        // Use plant.id as the unique 'key' prop. This is crucial for React's list rendering performance and correctness.
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </ul>
  );
}

export default PlantList;
