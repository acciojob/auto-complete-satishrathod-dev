// import React, { useEffect, useState } from "react";

// const AutoComplete = () => {
//   const fruits = ["apple", "banana", "cherry", "date", "elderberry", "fig"];
//   const [inputValue, setInputValue] = useState("");
//   const [suggestions, setSuggestions] = useState(fruits);
//   const [showSuggestions, setShowSuggestions] = useState(true);

//   // Function to filter suggestons
//   //   const filterSuggestons = (query) => {
//   //     if (query === "") {
//   //       return [];
//   //     }
//   //     return fruits.filter((fruits) =>
//   //       fruits.toLowerCase().includes(query.toLowerCase())
//   //     );
//   //   };
//   useEffect(() => {
//     if (inputValue === "") {
//       setSuggestions(fruits); // Show all fruits when input is empty
//     } else {
//       const filteredSuggestions = fruits.filter((fruit) =>
//         fruit.toLowerCase().includes(inputValue.toLowerCase())
//       );
//       setSuggestions(filteredSuggestions);
//     }
//   }, [inputValue]);

//   // Handle input change
//   const handleChange = (event) => {
//     const query = event.target.value;
//     setInputValue(query);
//     setShowSuggestions(true);

//     // Update suggestions asynchronously to avoid blocking the UI
//     // setTimeout(() => {
//     //   const filteredSuggestons = filterSuggestons(query);
//     //   setSuggestions(filteredSuggestons);
//     // }, 100); // Delay Bounce
//   };

//   // Handle suggestion click
//   const handleSuggestionClick = (suggestion) => {
//     setInputValue(suggestion);
//     setSuggestions([]);
//     setShowSuggestions(false);
//   };

//   // Hanlde input blur
//   const handleBlur = () => {
//     setTimeout(() => setShowSuggestions(false), 150); // Delay to allow click on suggestion
//   };

//   return (
//     <div className="autocomplete">
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         placeholder="start typing..."
//       />
//       {showSuggestions && suggestions.length > 0 && (
//         <ul className="suggestions-list">
//           {suggestions.map((suggestion, index) => (
//             <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AutoComplete;
import React, { useState } from "react";

const AutoComplete = () => {
  const fruits = ["apple", "banana", "cherry", "date", "elderberry", "fig"];
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");

  const onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = fruits.sort().filter((v) => regex.test(v));
    }
    setSuggestions(suggestions);
    setText(value);
  };

  const suggestionSelected = (value) => {
    setText(value);
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li key={index} onClick={() => suggestionSelected(item)}>
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <input value={text} onChange={onTextChanged} type="text" />
      {renderSuggestions()}
    </div>
  );
};

export default AutoComplete;
