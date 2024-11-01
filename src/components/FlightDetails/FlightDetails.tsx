import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatTime, statusClassname } from '../../utils/utils';
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
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import ErrorPage from '../ErrorPage/ErrorPage';
import { errorMessages } from '../../utils/messages';
import Loader from '../Loader/Loader';

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
    return <Loader />;
  }

  if (error || !flightDetails) {
    throw new Error('Error fetching flight details');
  }

  return (
    <Container>
      <Title>Flight Details</Title>
      <FlightInfoContainer>
        <Status className={statusClassname(flightDetails.status)}>{flightDetails.status}</Status>
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

const FlightDetailsWithErrorBoundary = () => {
  const navigate = useNavigate();
  const fallBack = (
    <ErrorPage
      header={errorMessages.flightDetailsNotFound.header}
      message={errorMessages.flightDetailsNotFound.message}
      actionLabel={errorMessages.flightDetailsNotFound.label}
      onAction={() => navigate('/')}
    />
  );

  return (
    <ErrorBoundary fallback={fallBack}>
      <FlightDetails />
    </ErrorBoundary>
  );
};

export default FlightDetailsWithErrorBoundary;
