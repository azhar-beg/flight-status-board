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
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    );
    expect(container.querySelector('#home')).toBeInTheDocument();
    expect(container.querySelector('#flights')).toBeInTheDocument();
  });

  it('navigates to the correct path when a link is clicked', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    );
    expect(container.querySelector('#home')!.closest('a')).toHaveAttribute('href', '/');
    expect(container.querySelector('#flights')!.closest('a')).toHaveAttribute('href', '/');
  });
});
