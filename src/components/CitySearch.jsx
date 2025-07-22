import React, { useState, useEffect } from 'react';


const CitySearch = ({ allLocations = [], setCurrentCity, setInfoAlert, inputPlaceholder = "Search for a city" }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);   
  
  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = Array.isArray(allLocations)
      ? allLocations.filter((location) =>
          location.toUpperCase().includes(value.toUpperCase())
        )
      : []; // Ensure filteredLocations is always an array

    setQuery(value);
    setSuggestions(filteredLocations);

    let infoText;
    if (filteredLocations.length === 0) {
      infoText = "We can not find the city you are looking for. Please try another city"
    } else {
      infoText = ""
    }
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); // to hide the list
    setCurrentCity(value);
    setInfoAlert(""); // Clear info alert when a city is selected
  };  
  

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder={inputPlaceholder}
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ?
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          })}
          <li key='See all cities' onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
        : null
      }
    </div>
  )
}


export default CitySearch;