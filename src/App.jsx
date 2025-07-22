import React from 'react';
import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';


import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");  

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert(
        "You are offline. The displayed event list has been loaded from the cache."
      );
    }
    fetchData();
  }, [currentCity, currentNOE]);
  
  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)      
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents)); 
  }

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <div className="main-content">
        <h1 className="page-title">CodeFare</h1>
        <div className="tagline"><em>Collab, Create, Connect</em></div>
        <CitySearch
          allLocations={allLocations}
          setCurrentCity={setCurrentCity}
          setInfoAlert={setInfoAlert}
          inputPlaceholder="Enter your city"
        />
        <NumberOfEvents
          currentNOE={currentNOE}
          setCurrentNOE={setCurrentNOE}
          setErrorAlert={setErrorAlert}
        />
        <button
          className="search-btn"
          onClick={fetchData}
        >
          search events
        </button>
        <div className="charts-container">
          <div style={{width: '100%', maxWidth: 600}}>
            <div className="chart-title">Event Genres Distribution</div>
            <EventGenresChart events={events} />
          </div>
          <div style={{width: '100%', maxWidth: 600}}>
            <div className="chart-title">Events per City</div>
            <CityEventsChart allLocations={allLocations} events={events} />
          </div>
        </div>
        <EventList events={events} /> 
      </div>
    </div>
  );
}


export default App;
