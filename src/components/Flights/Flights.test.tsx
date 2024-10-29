import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Flights from './Flights';
import { flightServiceClient } from '../../api/httpClient';
import { FlightStatus } from './Flights';

const mockedAxios = flightServiceClient as jest.Mocked<typeof flightServiceClient>;


jest.mock('../../api/httpClient');

const mockFlights = [
  {
    id: 1,
    flightNumber: 'AA123',
    airline: 'American Airlines',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: '2023-10-01T10:00:00Z',
    status: FlightStatus.OnTime,
  },
  {
    id: 2,
    flightNumber: 'DL456',
    airline: 'Delta Airlines',
    origin: 'ATL',
    destination: 'SFO',
    departureTime: '2023-10-01T12:00:00Z',
    status: FlightStatus.Delayed,
  },
];

describe('Flights Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    render(<Flights />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders flight data correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockFlights });
    // formatTime.mockImplementation((time) => time);

    render(<Flights />);

    await waitFor(() => {
      expect(screen.getByText('AA123')).toBeInTheDocument();
      expect(screen.getByText('American Airlines')).toBeInTheDocument();
      expect(screen.getByText('JFK')).toBeInTheDocument();
      expect(screen.getByText('LAX')).toBeInTheDocument();
      expect(screen.getByText('October 1, 2023 at 03:30 PM')).toBeInTheDocument();
      expect(screen.getByText('On Time')).toBeInTheDocument();
    });
  });

  it('renders error state when API call fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    render(<Flights />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByText('Error loading flights')).toBeInTheDocument();
    });
  });

  it('renders empty state when no flights are available', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<Flights />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByText('No flights available')).toBeInTheDocument();
    });
  });
});