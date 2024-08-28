import React, { useEffect, useState } from "react";

const AutoComplete = () => {
  const fruits = ["apple", "banana", "cherry", "date", "elderberry", "fig"];
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState(fruits);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Function to filter suggestons
  //   const filterSuggestons = (query) => {
  //     if (query === "") {
  //       return [];
  //     }
  //     return fruits.filter((fruits) =>
  //       fruits.toLowerCase().includes(query.toLowerCase())
  //     );
  //   };
  useEffect(() => {
    if (inputValue === "") {
      setSuggestions(fruits); // Show all fruits when input is empty
    } else {
      const filteredSuggestions = fruits.filter((fruit) =>
        fruit.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  }, [inputValue]);

  // Handle input change
  const handleChange = (event) => {
    const query = event.target.value;
    setInputValue(query);
    setShowSuggestions(true);

    // Update suggestions asynchronously to avoid blocking the UI
    // setTimeout(() => {
    //   const filteredSuggestons = filterSuggestons(query);
    //   setSuggestions(filteredSuggestons);
    // }, 100); // Delay Bounce
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Hanlde input blur
  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 150); // Delay to allow click on suggestion
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="start typing..."
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
