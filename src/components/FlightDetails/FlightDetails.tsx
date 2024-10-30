import React from 'react';
import { useParams } from 'react-router-dom';
import { formatTime } from '../../utils/utils';
import useFlightData from '../../hooks/useFlightData';
import {
  Container,
  Title,
  FlightInfoContainer,
  FlightInfo,
  Line,
  Journey,
  PlaneIcon,
  Status
} from './FlightDetails.styles';

import planeIcon from '../../assets/plane.png';

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
    <Container>
      <Title>Flight Details</Title>
      <FlightInfoContainer>
        <Status className={`status-${flightDetails.status.toLowerCase().replace(' ', '-')}`}>
          {flightDetails.status}
        </Status>
        <FlightInfo>{formatTime(flightDetails.departureTime)}</FlightInfo>
        <FlightInfo>{flightDetails.flightNumber}</FlightInfo>
        <FlightInfo>{flightDetails.airline}</FlightInfo>
      </FlightInfoContainer>
      <Journey>
        <span>{flightDetails.origin}</span>
        <Line />
        <PlaneIcon src={planeIcon} alt="Plane" />
        <Line />
        <span>{flightDetails.destination}</span>
      </Journey>
    </Container>
  );
};

export default FlightDetails;
