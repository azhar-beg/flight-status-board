import React from 'react';
import { HeaderContainer, NavMenu, Title } from './Header.styles';

const Header = () => (
  <HeaderContainer>
    <div className="header-container">
      <Title>Flight Status Board</Title>
      <NavMenu>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/flights">Flights</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </NavMenu>
    </div>
  </HeaderContainer>
);

export default Header;