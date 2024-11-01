import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 65%;
  margin: 100px auto;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #d04000;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

interface ErrorBannerProps {
  header: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

const ErrorPage: React.FC<ErrorBannerProps> = ({ header, message, actionLabel, onAction }) => {
  return (
    <Container>
      <Title>{header}</Title>
      <Message>{message}</Message>
      {actionLabel && onAction ? <Button onClick={onAction}>{actionLabel}</Button> : null}
    </Container>
  );
};

export default ErrorPage;
