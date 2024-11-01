import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from '../../setupTests';
import FlightDetails from './FlightDetails';
import { flightServiceClient } from '../../api/httpClient';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { errorMessages, travelQuotes } from '../../utils/messages';

const mockedAxios = flightServiceClient as jest.Mocked<typeof flightServiceClient>;

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

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

    const quote = screen.getByText((content) => {
      return travelQuotes.includes(content);
    });

    expect(quote).toBeInTheDocument();
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
      expect(screen.getByText('AA123')).toBeInTheDocument();
      expect(screen.getByText('American Airlines')).toBeInTheDocument();
      expect(screen.getByText('JFK')).toBeInTheDocument();
      expect(screen.getByText('LAX')).toBeInTheDocument();
      expect(screen.getByText('October 1, 2023 at 10:00 AM')).toBeInTheDocument();
      expect(screen.getByText('On Time')).toBeInTheDocument();
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
      expect(screen.getByText('Flight Details Are Not Available')).toBeInTheDocument();
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
      expect(screen.getByText('Flight Details Are Not Available')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(errorMessages.flightDetailsNotFound.label));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });
});
