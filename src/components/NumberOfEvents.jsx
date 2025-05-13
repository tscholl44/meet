import React, { useState } from 'react';

const NumberOfEvents = () => {
  const [eventCount, setEventCount] = useState(32); // Default value is 32

  const handleInputChange = (event) => {
    setEventCount(event.target.value);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="event-count-input">Number of Events:</label>
      <input
        type="number"
        id="event-count-input"
        className="event-number"
        role="textbox"
        value={eventCount}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;