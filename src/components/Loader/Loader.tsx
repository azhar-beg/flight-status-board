import React from 'react';
import styled from 'styled-components';
import { travelQuotes } from '../../utils/messages';

const BannerContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 500px;
  max-width: 75%;
  margin: 100px auto;
  text-align: center;
  height: auto;
`;

const GifImage = styled.img`
  margin-top: 20px;
  width: 100px;
  height: auto;
`;

const Message = styled.p`
  color: #444400;
  font-weight: bold;
  margin-bottom: 20px;
`;

import gifImage from '../../assets/loader.gif';

function getRandomQuote(quotes: string[]): string {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

const Loader: React.FC = () => {
  return (
    <div id="loader" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <BannerContainer>
        {gifImage && (
          <>
            <GifImage src={gifImage} alt="Loading..." />
            <Message>{getRandomQuote(travelQuotes)}</Message>
          </>
        )}
      </BannerContainer>
    </div>
  );
};

export default Loader;
