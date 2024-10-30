import styled from 'styled-components';

export const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background-color: ${({ theme }) => theme.colors.header};
    color: white;
    padding: 12px;
    text-align: left;

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 10px;
    }
  }

  tr {
    &:nth-child(even) {
      background-color: ${({ theme }) => theme.colors.secondary};
    }

    &:nth-child(odd) {
      background-color: ${({ theme }) => theme.colors.primary};
    }

    &:hover {
      background-color: #d9d9d9;
    }
  }

  td {
    padding: 12px;
    text-align: left;

    cursor: pointer;

    &.status-on-time {
      color: ${({ theme }) => theme.colors.status.onTime};
    }

    &.status-delayed {
      color: ${({ theme }) => theme.colors.status.delayed};
    }

    &.status-boarding {
      color: ${({ theme }) => theme.colors.status.boarding};
    }

    &.status-departed {
      color: ${({ theme }) => theme.colors.status.departed};
    }

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 10px;
    }
  }
`;
export const DepartureTime = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;
