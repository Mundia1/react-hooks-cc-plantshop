import React, { useState, useEffect } from "react"; // Import useState and useEffect hooks
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

// Main component for the Plant Page
function PlantPage() {
  // State to hold the array of plant objects fetched from the API
  const [plants, setPlants] = useState([]);
  // State to hold the current value of the search input
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect hook to perform side effects, specifically fetching data
  // This effect runs only once after the initial render because of the empty dependency array []
  useEffect(() => {
    // Fetch data from the local backend server
    fetch("http://localhost:6001/plants")
      .then(r => r.json()) // Parse the JSON response
      .then(data => setPlants(data)) // Update the 'plants' state with the fetched data
      .catch(error => console.error("Error fetching plants:", error)); // Log any errors during fetch
  }, []); // Empty dependency array means this effect runs only once on component mount

  // Function to handle adding a new plant
  // This function will be passed down to the NewPlantForm component
  function handleAddPlant(newPlant) {
    // Send a POST request to add the new plant to the backend
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify(newPlant), // Send the new plant object as a JSON string in the request body
    })
    .then(r => r.json()) // Parse the JSON response from the backend (which should be the added plant with an ID)
    .then(addedPlant => {
      // Update the 'plants' state by adding the newly added plant to the existing list
      // Use the spread operator (...) to create a new array with all existing plants plus the addedPlant
      setPlants([...plants, addedPlant]);
    })
    .catch(error => console.error("Error adding plant:", error)); // Log any errors during the POST request
  }

  // Function to handle changes in the search input field
  // This function will be passed down to the Search component
  function handleSearchChange(e) {
    // Update the 'searchTerm' state with the current value of the input field
    setSearchTerm(e.target.value);
  }

  // Filter the list of plants based on the current search term
  // The filter method creates a new array containing only the plants whose name includes the searchTerm
  // Both the plant name and the search term are converted to lowercase for case-insensitive searching
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      {/* Render the NewPlantForm component */}
      {/* Pass the handleAddPlant function as a prop so the form can call it on submission */}
      <NewPlantForm onAddPlant={handleAddPlant} />

      {/* Render the Search component */}
      {/* Pass the handleSearchChange function as a prop so the search input can update the searchTerm state */}
      <Search onSearchChange={handleSearchChange} />

      {/* Render the PlantList component */}
      {/* Pass the 'filteredPlants' array as a prop so the list only displays the plants matching the search */}
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
