import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 75%;
  margin: 100px auto;
  height: auto;
`;

export const Title = styled.h2`
  color: #343a40;
  overflow-x: auto;
  margin-bottom: 20px;
`;

export const FlightInfoContainer = styled.div`
  display: flex;
  overflow-x: auto;
  align-items: center;
  margin-bottom: 20px;
`;

export const FlightInfo = styled.span`
  margin: 15px;
`;

export const Line = styled.div`
  flex-grow: 1;
  height: 2px;
  background-color: #ccc;
  margin: 0 10px;
`;

export const Journey = styled.div`
  overflow-x: auto;
  display: flex;
  align-items: center;
`;

export const PlaneIcon = styled.img`
  width: 30px;
`;

export const Status = styled.span`
  font-size: 16px;

  &.status-on-time {
    color: green;
  }

  &.status-delayed {
    color: orange;
  }

  &.status-boarding {
    color: blue;
  }

  &.status-departed {
    color: gray;
  }
`;
