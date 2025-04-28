import React, { useState } from "react"; // Import useState hook for local state

// PlantCard component responsible for displaying a single plant's information
// It receives an individual plant object as a prop named 'plant'
function PlantCard({ plant }) {
  // State to manage the "sold out" status specifically for this plant card
  // Initialize 'isSoldOut' to false, meaning the plant is initially in stock
  const [isSoldOut, setIsSoldOut] = useState(false);

  // Function to toggle the "sold out" status when the button is clicked
  function handleToggleStock() {
    // Update the 'isSoldOut' state to the opposite of its current value
    setIsSoldOut(!isSoldOut);
  }

  return (
    <li className="card" data-testid="plant-item">
      {/* Display the plant image */}
      {/* Use the 'image' property from the 'plant' prop for the src attribute */}
      {/* Use the 'name' property from the 'plant' prop for the alt text */}
      <img src={plant.image} alt={plant.name} />

      {/* Display the plant name */}
      {/* Use the 'name' property from the 'plant' prop */}
      <h4>{plant.name}</h4>

      {/* Display the plant price */}
      {/* Use the 'price' property from the 'plant' prop */}
      <p>Price: {plant.price}</p>

      {/* Render the stock status button */}
      {/* Conditionally render the button based on the 'isSoldOut' state */}
      {isSoldOut ? (
        // If 'isSoldOut' is true, show the "Out of Stock" button
        // Attach the handleToggleStock function to the onClick event
        <button onClick={handleToggleStock}>Out of Stock</button>
      ) : (
        // If 'isSoldOut' is false, show the "In Stock" button with the 'primary' class
        // Attach the handleToggleStock function to the onClick event
        <button onClick={handleToggleStock} className="primary">In Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
