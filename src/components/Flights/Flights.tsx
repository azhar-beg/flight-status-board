import React, { useEffect, useState } from 'react';
import { flightServiceClient } from '../../api/httpClient';
import { formatTime } from '../../utils';

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
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlightData = async () => {
      console.log('fetchFlightData');
      try {
        const response = await flightServiceClient.get('/flights');
        setFlights(response.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading flights</div>;
  }

  if (flights.length === 0) {
    return <div>No flights available</div>;
  }

  return (
    <table>
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
          <tr key={flight.id}>
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
