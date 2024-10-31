import React from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';
import { useNavigate } from 'react-router-dom';
import { errorMessages } from '../../utils/messages';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <ErrorPage
      header={errorMessages.pageNotFound.header}
      message={errorMessages.pageNotFound.message}
      actionLabel={errorMessages.pageNotFound.label}
      onAction={() => navigate('/')}
    />
  );
};

export default NotFound;
