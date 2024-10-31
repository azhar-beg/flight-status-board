import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import ErrorPage from './ErrorPage';
import { render } from '../../setupTests';

describe('ErrorPage Component', () => {
  it('renders the header and message correctly', () => {
    render(<ErrorPage header="Error Header" message="Error Message" />);
    expect(screen.getByText('Error Header')).toBeInTheDocument();
    expect(screen.getByText('Error Message')).toBeInTheDocument();
  });

  it('renders the action button when actionLabel and onAction are provided', () => {
    const mockOnAction = jest.fn();
    render(
      <ErrorPage
        header="Error Header"
        message="Error Message"
        actionLabel="Retry"
        onAction={mockOnAction}
      />
    );
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('does not render the action button when actionLabel and onAction are not provided', () => {
    render(<ErrorPage header="Error Header" message="Error Message" />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('calls onAction when the action button is clicked', () => {
    const mockOnAction = jest.fn();
    render(
      <ErrorPage
        header="Error Header"
        message="Error Message"
        actionLabel="Retry"
        onAction={mockOnAction}
      />
    );
    fireEvent.click(screen.getByText('Retry'));
    expect(mockOnAction).toHaveBeenCalledTimes(1);
  });

  it('does not render the action button if only actionLabel is provided', () => {
    render(<ErrorPage header="Error Header" message="Error Message" actionLabel="Retry" />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('does not render the action button if only onAction is provided', () => {
    const mockOnAction = jest.fn();
    render(<ErrorPage header="Error Header" message="Error Message" onAction={mockOnAction} />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
