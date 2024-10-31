import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './PageNotFound';
import { errorMessages } from '../../utils/messages';
import { ThemeProvider } from 'styled-components';
import theme from '../../utils/theme';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));



describe('NotFound Component', () => {
  it('renders the page not found error message correctly', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <NotFound />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(errorMessages.pageNotFound.header)).toBeInTheDocument();
    expect(screen.getByText(errorMessages.pageNotFound.message)).toBeInTheDocument();
    expect(screen.getByText(errorMessages.pageNotFound.label)).toBeInTheDocument();
  });

  it('navigates to home page when action button is clicked', async () => {

    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <NotFound />
        </ThemeProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(errorMessages.pageNotFound.label));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });
});