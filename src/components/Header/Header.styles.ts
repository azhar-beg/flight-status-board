import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: auto;
`;

export const Title = styled.h1`
  padding-left: 10px;
  color: ${({ theme }) => theme.colors.text};
`;

export const NavMenu = styled.nav`
  ul {
    overflow-x: auto;
    padding-left: 10px;
    list-style-type: none;
    display: flex;
    background-color: ${({ theme }) => theme.colors.primary};

    li:nth-last-child(1) {
      margin-left: 20px;
    }
  }
`;
