import React from 'react';
import { useParams } from 'react-router-dom';
import { formatTime } from '../../utils/utils';
import useFlightData from '../../hooks/useFlightData';

export interface FlightDetails {
  id: number;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

const FlightDetails = () => {
  const { id } = useParams();

  const { response: flightDetails, error, loading } = useFlightData<FlightDetails>(Number(id));
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading flight details</div>;
  }

  if (!flightDetails) {
    return <div>No flight details available</div>;
  }

  return (
    <div>
      <h2>Flight Details</h2>
      <p>Flight details go here: {id}</p>
      <p>Flight Number: {flightDetails.flightNumber}</p>
      <p>Airline: {flightDetails.airline}</p>
      <p>Origin: {flightDetails.origin}</p>
      <p>Destination: {flightDetails.destination}</p>
      <p>Departure Time: {formatTime(flightDetails.departureTime)}</p>
      <p>Status: {flightDetails.status}</p>
    </div>
  );
};

export default FlightDetails;
