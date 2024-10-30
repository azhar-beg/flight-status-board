import React from 'react';
import { HeaderContainer, NavMenu, Title } from './Header.styles';
import airplaneLogo from '../../assets/airplane.png';
import homeLogo from '../../assets/home.png';

const Header = () => (
  <HeaderContainer>
    <div className="header-container">
      <Title>Flight Status Board</Title>
      <NavMenu>
        <ul>
          <li>
            <a href="/" id="home">
              <img
                src={homeLogo}
                alt="Home"
                style={{ width: '30px', height: '30px', marginRight: '5px' }}
              />
            </a>
          </li>
          <li>
            <a href="/" id="flights">
              <img
                src={airplaneLogo}
                alt="Flights"
                style={{ width: '30px', height: '30px', marginRight: '5px' }}
              />
            </a>
          </li>
        </ul>
      </NavMenu>
    </div>
  </HeaderContainer>
);

export default Header;
