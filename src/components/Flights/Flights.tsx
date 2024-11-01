import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime, statusClassname } from '../../utils/utils';
import useFlightData from '../../hooks/useFlightData';
import { DepartureTime, StyledTable, TableContainer } from './Flights.styles';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import ErrorPage from '../ErrorPage/ErrorPage';
import { errorMessages } from '../../utils/messages';
import Loader from '../Loader/Loader';

interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

const Flights = () => {
  const navigate = useNavigate();
  const { response: flights, error, loading } = useFlightData<Flight[]>();

  if (loading) {
    return <Loader />;
  }

  if (error || !flights || flights.length === 0) {
    throw new Error('Flights not found');
  }

  const navigateToFlightDetails = (id: number) => {
    navigate(`/flight-details/${id}`);
  };

  return (
    <TableContainer>
      <StyledTable role="table">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => {
            const [date, time] = formatTime(flight.departureTime).split(' at ');
            return (
              <tr key={flight.id} onClick={() => navigateToFlightDetails(flight.id)}>
                <td>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>
                  <DepartureTime>{time}</DepartureTime> {date}
                </td>
                <td className={statusClassname(flight.status)}>{flight.status}</td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

const FlightsWithErrorBoundary = () => {
  const fallBack = (
    <ErrorPage
      header={errorMessages.flightsNotFound.header}
      message={errorMessages.flightsNotFound.message}
    />
  );
  return (
    <ErrorBoundary fallback={fallBack}>
      <Flights />
    </ErrorBoundary>
  );
};
export default FlightsWithErrorBoundary;
