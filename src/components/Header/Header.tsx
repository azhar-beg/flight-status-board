import React, { FC } from 'react';
import { HeaderContainer, NavMenu, Title, ButtonWrapper } from './Header.styles';
import { useNavigate } from 'react-router-dom';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

interface HeaderProps {
  toggleTheme: () => void;
  isLightTheme: boolean;
}

const Header: FC<HeaderProps> = ({ toggleTheme, isLightTheme }) => {
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
          <ToggleSwitch toggle={toggleTheme} checked={!isLightTheme} />
        </NavMenu>
      </div>
    </HeaderContainer>
  );
};

export default Header;
