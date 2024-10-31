import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './PageNotFound';
import { errorMessages } from '../../utils/messages';
import { render } from '../../setupTests';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('NotFound Component', () => {
  it('renders the page not found error message correctly', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText(errorMessages.pageNotFound.header)).toBeInTheDocument();
    expect(screen.getByText(errorMessages.pageNotFound.message)).toBeInTheDocument();
    expect(screen.getByText(errorMessages.pageNotFound.label)).toBeInTheDocument();
  });

  it('navigates to home page when action button is clicked', async () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(errorMessages.pageNotFound.label));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });
});
