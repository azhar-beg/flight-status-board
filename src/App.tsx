import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Flights from './components/Flights/Flights';
import FlightDetails from './components/FlightDetails/FlightDetails';

function App() {
  console.log('App');
  return (
    <div>
      <h1>Flight Status Board</h1>
      <Routes>
        <Route path="/" element={<Flights />} />
        <Route path="/flight-details/:id" element={<FlightDetails />} />
      </Routes>
    </div>
  );
}

export default App;
