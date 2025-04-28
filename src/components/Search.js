import React from "react";

// Search component responsible for the search input field
// It receives a function to handle search input changes as a prop named 'onSearchChange'
function Search({ onSearchChange }) {
  return (
    <div className="searchbar">
      {/* Label for the search input */}
      <label htmlFor="search">Search Plants:</label>

      {/* Input element for searching */}
      {/* The 'id' attribute matches the 'htmlFor' attribute of the label for accessibility */}
      {/* The 'placeholder' provides a hint to the user */}
      {/* The 'onChange' event handler is triggered whenever the input value changes */}
      {/* It calls the 'onSearchChange' function passed from the parent component (PlantPage) */}
      {/* The parent component will use the event object (e) to get the current input value (e.target.value) and update its search state */}
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={onSearchChange}
      />
    </div>
  );
}

export default Search;
