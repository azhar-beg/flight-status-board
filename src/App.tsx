import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Flights from './components/Flights/Flights';
import FlightDetails from './components/FlightDetails/FlightDetails';
import Header from './components/Header/Header';
import theme from './utils/theme';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Loader from './components/Loader/Loader';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Flights />} />
            <Route path="/flight-details/:id" element={<FlightDetails />} />
            <Route path="/fun" element={<Loader />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  );
}

export default App;
