import React, { Component, ReactNode } from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';
import { errorMessages } from '../../utils/messages';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <ErrorPage
            header={errorMessages.default.header}
            message={errorMessages.default.message}
          />
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
