import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Flights from './components/Flights/Flights';
import FlightDetails from './components/FlightDetails/FlightDetails';
import Header from './components/Header/Header';
import theme from './utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Flights />} />
          <Route path="/flight-details/:id" element={<FlightDetails />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
