import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FlightDetails from './FlightDetails';
import { flightServiceClient } from '../../api/httpClient';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mockedAxios = flightServiceClient as jest.Mocked<typeof flightServiceClient>;

jest.mock('../../api/httpClient');

const mockFlightDetails = {
  id: 1,
  flightNumber: 'AA123',
  airline: 'American Airlines',
  origin: 'JFK',
  destination: 'LAX',
  departureTime: '2023-10-01T10:00:00Z',
  status: 'On Time'
};

describe('FlightDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockFlightDetails });
    render(
      <MemoryRouter initialEntries={['/flights/123']}>
        <Routes>
          <Route path="/flights/:id" element={<FlightDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders flight details correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockFlightDetails });

    render(
      <MemoryRouter initialEntries={['/flights/1']}>
        <Routes>
          <Route path="/flights/:id" element={<FlightDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Flight Details')).toBeInTheDocument();
      expect(screen.getByText('Flight Number: AA123')).toBeInTheDocument();
      expect(screen.getByText('Airline: American Airlines')).toBeInTheDocument();
      expect(screen.getByText('Origin: JFK')).toBeInTheDocument();
      expect(screen.getByText('Destination: LAX')).toBeInTheDocument();
      expect(screen.getByText('Departure Time: October 1, 2023 at 03:30 PM')).toBeInTheDocument();
      expect(screen.getByText('Status: On Time')).toBeInTheDocument();
    });
  });

  it('renders error state when API call fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    render(
      <MemoryRouter initialEntries={['/flights/1']}>
        <Routes>
          <Route path="/flights/:id" element={<FlightDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByText('Error loading flight details')).toBeInTheDocument();
    });
  });

  it('renders empty state when no flight details are available', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: null });

    render(
      <MemoryRouter initialEntries={['/flights/1']}>
        <Routes>
          <Route path="/flights/:id" element={<FlightDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByText('No flight details available')).toBeInTheDocument();
    });
  });
});
