import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '../../utils/utils';
import useFlightData from '../../hooks/useFlightData';
import { DepartureTime, StyledTable, TableContainer } from './Flights.styles';

export interface Flight {
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
    return <div>Loading flights...</div>;
  }

  if (error) {
    return <div>Failed to load flights. Please try again later.</div>;
  }

  if (!flights || flights.length === 0) {
    return <div>No flights available</div>;
  }

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
              <tr key={flight.id} onClick={() => navigate(`/flight-details/${flight.id}`)}>
                <td>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>
                  <DepartureTime>{time}</DepartureTime> {date}
                </td>
                <td className={`status-${flight.status.toLowerCase().replace(' ', '-')}`}>
                  {flight.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default Flights;
