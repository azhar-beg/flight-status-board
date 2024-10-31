import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Flights from './components/Flights/Flights';
import FlightDetails from './components/FlightDetails/FlightDetails';
import Header from './components/Header/Header';
import theme from './utils/theme';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Loader from './components/Loader/Loader';

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Flights />} />
            <Route path="/flight-details/:id" element={<FlightDetails />} />
            <Route path="/fun" element={<Loader />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ErrorBoundary>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
