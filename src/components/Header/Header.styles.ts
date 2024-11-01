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
  overflow-x: auto;
`;

export const NavMenu = styled.nav`
  ul {
    overflow-x: auto;
    padding: 10px;
    list-style-type: none;
    display: flex;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ButtonWrapper = styled.button`
  background-color: transparent;
  border-radius: 4px;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 20px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;
