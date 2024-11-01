import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { flightServiceClient } from './api/httpClient';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

const mockedAxios = flightServiceClient as jest.Mocked<typeof flightServiceClient>;
jest.mock('./api/httpClient');

const mockFlightDetails = {
  id: 1,
  flightNumber: 'AA123',
  airline: 'American Airlines',
  origin: 'JFK',
  destination: 'LAX',
  departureTime: '2023-10-01T10:00:00Z',
  status: 'On Time'
};

describe('App Component', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  })

  it('renders the Flight Status Board link', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const linkElement = screen.getByText(/Flight Status Board/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders FlightDetails component for flight-details path', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockFlightDetails });
    render(
      <MemoryRouter initialEntries={['/flight-details/1']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText(/Flight Details/i)).toBeInTheDocument());
  });

  it('renders PageNotFound component for unknown path', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });

  it('should match previous snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
