import React from 'react';
import { HeaderContainer, NavMenu, Title, ButtonWrapper } from './Header.styles';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <div className="header-container">
        <Title>Flight Status Board</Title>
        <NavMenu>
          <ul>
            <li>
              <ButtonWrapper
                id="home"
                onClick={() => navigate('/')} // Redirect to home
              >
                Home
              </ButtonWrapper>
            </li>
          </ul>
        </NavMenu>
      </div>
    </HeaderContainer>
  );
};

export default Header;
