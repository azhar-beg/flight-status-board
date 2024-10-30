import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { ThemeProvider } from 'styled-components';
import theme from '../../utils/theme';

describe('Header Component', () => {
  it('renders the title correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    );
    expect(screen.getByText('Flight Status Board')).toBeInTheDocument();
  });

  it('renders the navigation menu with all links', () => {
    render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Flights')).toBeInTheDocument();
  });

  it('navigates to the correct path when a link is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    );
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Flights').closest('a')).toHaveAttribute('href', '/');
  });
});
