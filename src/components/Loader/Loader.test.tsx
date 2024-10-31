import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../setupTests';
import Loader from './Loader';
import { travelQuotes } from '../../utils/messages';

describe('Loader Component', () => {
  it('displays a random travel quote', () => {
    render(<Loader />);
    const quote = screen.getByText((content) => {
      return travelQuotes.includes(content);
    });
    expect(quote).toBeInTheDocument();
  });
});
