import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../setupTests';
import ToggleSwitch from './ToggleSwitch';

describe('ToggleSwitch Component', () => {
  it('displays Light theme when unchecked', () => {
    render(<ToggleSwitch toggle={jest.fn()} checked={false} />);
    expect(screen.getByText('Light')).toBeInTheDocument();
  });

  it('displays Dark theme when checked', () => {
    render(<ToggleSwitch toggle={jest.fn()} checked={true} />);
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('calls toggle function when clicked', async () => {
    const mockToggle = jest.fn();
    const { container } = render(<ToggleSwitch toggle={mockToggle} checked={false} />);
    await waitFor(() => fireEvent.click(container.querySelector('input')!));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('checkbox is checked when checked prop is true', () => {
    const { container } = render(<ToggleSwitch toggle={jest.fn()} checked={true} />);
    expect(container.querySelector('input')).toBeChecked();
  });

  it('checkbox is not checked when checked prop is false', () => {
    const { container } = render(<ToggleSwitch toggle={jest.fn()} checked={false} />);
    expect(container.querySelector('input')).not.toBeChecked();
  });
});
