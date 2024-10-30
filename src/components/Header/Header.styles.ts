import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: auto;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
`;

export const NavMenu = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    background-color: ${({ theme }) =>
      theme.colors.primary}; /* Ensure background color is applied */

    li {
      margin-left: 20px;

      a {
        text-decoration: none;
        color: ${({ theme }) => theme.colors.text};
        &:hover {
          color: #b7b7b7; /* Light gray on hover */
        }
      }
    }

    @media (max-width: 768px) {
      justify-content: center;

      li {
        margin-left: 10px;
        margin-bottom: 10px;
      }
    }
  }
`;
