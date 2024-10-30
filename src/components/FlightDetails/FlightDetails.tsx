import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { flightServiceClient } from '../../api/httpClient';
import { formatTime } from '../../utils';

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
  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlightData = async () => {
      console.log('fetchFlightData');
      try {
        const response = await flightServiceClient.get(`/flights/${id}`);
        setFlightDetails(response.data);
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
