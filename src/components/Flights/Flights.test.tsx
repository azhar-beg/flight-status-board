import React, { act } from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from '../../setupTests';
import Flights from './Flights';
import { flightServiceClient } from '../../api/httpClient';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useNavigate } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { travelQuotes } from '../../utils/messages';

const mockedAxios = flightServiceClient as jest.Mocked<typeof flightServiceClient>;

jest.mock('../../api/httpClient');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const mockFlights = [
  {
    id: 1,
    flightNumber: 'AA123',
    airline: 'American Airlines',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: '2023-10-01T10:00:00Z',
    status: 'On Time'
  },
  {
    id: 2,
    flightNumber: 'DL456',
    airline: 'Delta Airlines',
    origin: 'ATL',
    destination: 'SFO',
    departureTime: '2023-10-01T12:00:00Z',
    status: 'Delayed'
  }
];

describe('Flights Component', () => {
  it('renders loading state initially', async () => {
    render(
      <MemoryRouter>
        <Flights />
      </MemoryRouter>
    );
    const quote = screen.getByText((content) => {
      return travelQuotes.includes(content);
    });

    expect(quote).toBeInTheDocument();
  });

  it('renders flight data correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockFlights });
    render(
      <MemoryRouter>
        <Flights />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/American Airlines/i)).toBeInTheDocument();
    });
  });

  it('renders error state when API call fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
    render(
      <MemoryRouter>
        <Flights />
      </MemoryRouter>
    );

    const error = 'No Flights Available';
    await waitFor(() => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
  });

  it('renders empty state when no flights are available', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    render(
      <MemoryRouter>
        <Flights />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/no flights available/i)).toBeInTheDocument();
    });
  });

  it('navigates to flight details on row click', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockFlights });
    render(
      <MemoryRouter>
        <Flights />
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText(/American Airlines/i));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/flight-details/1');
  });

  it('renders different flight statuses correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockFlights });
    render(
      <MemoryRouter>
        <Flights />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Delayed/i)).toBeInTheDocument();
      expect(screen.getByText(/On Time/i)).toBeInTheDocument();
    });
  });

  it('updates flight data periodically', async () => {
    jest.useFakeTimers();
    mockedAxios.get.mockResolvedValueOnce({ data: mockFlights }).mockResolvedValue({
      data: [
        {
          id: 1,
          flightNumber: 'AA123',
          airline: 'Indian Airlines',
          origin: 'JFK',
          destination: 'LAX',
          departureTime: '2023-10-01T10:00:00Z',
          status: 'On Time'
        }
      ]
    });
    render(
      <MemoryRouter>
        <Flights />
      </MemoryRouter>
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.getByText(/Indian Airlines/i)).toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
