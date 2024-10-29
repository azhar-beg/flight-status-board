import axios from 'axios';

export const flightServiceClient = axios.create({
  baseURL: 'https://flight-status-mock.core.travelopia.cloud',
  timeout: 3000
});
