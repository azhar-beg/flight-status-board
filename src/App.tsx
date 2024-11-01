import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Flights from './components/Flights/Flights';
import FlightDetails from './components/FlightDetails/FlightDetails';
import Header from './components/Header/Header';
import { lightTheme, darkTheme } from './utils/theme';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PageNotFound from './components/PageNotFound/PageNotFound';

const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
    overflow-x: hidden;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background}; // Set background color from theme
  }
`;

function App() {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const toggleTheme = () => {
    setIsLightTheme((prevTheme) => !prevTheme);
  };
  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div>
        <Header toggleTheme={toggleTheme} isLightTheme={isLightTheme} />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Flights />} />
            <Route path="/flight-details/:id" element={<FlightDetails />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  );
}

export default App;
