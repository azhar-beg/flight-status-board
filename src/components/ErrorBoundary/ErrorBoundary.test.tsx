import React from 'react';
import { screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { errorMessages } from '../../utils/messages';
import { render } from '../../setupTests';

describe('ErrorBoundary Component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders default error page when an error is caught', () => {
    const ThrowError = () => {
      throw new Error('Test Error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(errorMessages.default.header)).toBeInTheDocument();
    expect(screen.getByText(errorMessages.default.message)).toBeInTheDocument();
  });

  it('renders custom fallback when provided and an error is caught', () => {
    const ThrowError = () => {
      throw new Error('Test Error');
    };

    render(
      <ErrorBoundary fallback={<div>Custom Fallback</div>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Fallback')).toBeInTheDocument();
  });
});
