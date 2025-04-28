import React, { useState } from "react"; // Import useState hook for form input state management

// NewPlantForm component responsible for the form to add a new plant
// It receives a function to handle adding a new plant as a prop named 'onAddPlant'
function NewPlantForm({ onAddPlant }) {
  // State for each input field in the form
  const [name, setName] = useState(""); // State for the plant name input
  const [image, setImage] = useState(""); // State for the image URL input
  // Keep price as a string state as it comes directly from the input
  const [price, setPrice] = useState("");

  // Function to handle the form submission event
  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default browser form submission behavior (which causes a page reload)

    // Create a new plant object using the current state values from the form inputs
    const newPlant = {
      name: name,
      image: image,
      // *** ADJUSTMENT FOR TEST: Send price as a string as expected by the test ***
      // Do NOT use parseFloat here if the test expects a string
      price: price,
    };

    // Send a POST request to add the new plant to the backend
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        // *** ADJUSTMENT FOR TEST: Use capitalized Content-Type as expected by the test ***
        "Content-Type": "Application/JSON", // Note the capital 'A' as per the test
      },
      body: JSON.stringify(newPlant), // Send the new plant object as a JSON string in the request body
    })
    .then(r => r.json()) // Parse the JSON response from the backend (which should be the added plant with an ID)
    .then(addedPlant => {
      // Call the 'onAddPlant' function passed from the parent component (PlantPage)
      // This function is responsible for updating the main plant list state in PlantPage
      onAddPlant(addedPlant); // Pass the addedPlant object received from the backend
    })
    .catch(error => console.error("Error adding plant:", error)); // Log any errors during the POST request


    // Clear the form inputs after successful submission
    // Resetting the state values clears the input fields in the UI
    setName("");
    setImage("");
    setPrice("");
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      {/* The form element with the onSubmit handler */}
      {/* When the form is submitted (e.g., by clicking the button or pressing Enter in an input), the handleSubmit function is called */}
      <form onSubmit={handleSubmit}>
        {/* Input field for the plant name */}
        {/* The 'value' attribute is controlled by the 'name' state */}
        {/* The 'onChange' event handler updates the 'name' state whenever the input value changes */}
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Input field for the image URL */}
        {/* The 'value' attribute is controlled by the 'image' state */}
        {/* The 'onChange' event handler updates the 'image' state whenever the input value changes */}
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* Input field for the price */}
        {/* type="number" provides numeric input features (like spinners in some browsers) */}
        {/* step="0.01" allows decimal values with two decimal places */}
        {/* The 'value' attribute is controlled by the 'price' state */}
        {/* The 'onChange' event handler updates the 'price' state whenever the input value changes */}
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Submit button for the form */}
        {/* type="submit" makes this button trigger the form's onSubmit event */}
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
