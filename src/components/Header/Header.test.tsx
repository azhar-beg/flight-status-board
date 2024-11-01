import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import Header from './Header';
import { render } from '../../setupTests';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Header Component', () => {
  it('renders the title correctly', () => {
    render(
      <MemoryRouter>
        <Header isLightTheme={true} toggleTheme={jest.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText('Flight Status Board')).toBeInTheDocument();
  });

  it('renders the navigation menu with all links', () => {
    const { container } = render(
      <MemoryRouter>
        <Header isLightTheme={true} toggleTheme={jest.fn()} />
      </MemoryRouter>
    );
    expect(container.querySelector('#home')).toBeInTheDocument();
  });

  it('navigates to the correct path when a link is clicked', async () => {
    const { container } = render(
      <MemoryRouter>
        <Header isLightTheme={true} toggleTheme={jest.fn()} />
      </MemoryRouter>
    );
    fireEvent.click(container.querySelector('#home')!);
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });
});
