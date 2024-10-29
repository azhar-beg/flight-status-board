import React from 'react';
import { useParams } from 'react-router-dom';

const FlightDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Flight Details</h2>
      <p>Flight details go here: {id}</p>
    </div>
  );
};

export default FlightDetails;
