import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '../../utils';
import useFlightData from '../../hooks/useFlightData';

export enum FlightStatus {
  OnTime = 'On Time',
  Delayed = 'Delayed',
  Boarding = 'Boarding',
  Departed = 'Departed'
}

export interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: FlightStatus;
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
    <table role="table">
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
        {flights.map((flight) => (
          <tr
            key={flight.id}
            onClick={() => navigate(`/flight-details/${flight.id}`)}
            role="row"
            style={{ cursor: 'pointer' }}
          >
            <td>{flight.flightNumber}</td>
            <td>{flight.airline}</td>
            <td>{flight.origin}</td>
            <td>{flight.destination}</td>
            <td>{formatTime(flight.departureTime)}</td>
            <td>{flight.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Flights;
