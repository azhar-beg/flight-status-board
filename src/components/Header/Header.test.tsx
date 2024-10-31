import React from 'react';
import { screen } from '@testing-library/react';

import Header from './Header';
import { render } from '../../setupTests';

describe('Header Component', () => {
  it('renders the title correctly', () => {
    render(<Header />);
    expect(screen.getByText('Flight Status Board')).toBeInTheDocument();
  });

  it('renders the navigation menu with all links', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('#home')).toBeInTheDocument();
    expect(container.querySelector('#flights')).toBeInTheDocument();
  });

  it('navigates to the correct path when a link is clicked', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('#home')!.closest('a')).toHaveAttribute('href', '/');
    expect(container.querySelector('#flights')!.closest('a')).toHaveAttribute('href', '/');
  });
});
