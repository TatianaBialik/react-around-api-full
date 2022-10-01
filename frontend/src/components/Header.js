import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ email, onLogout }) {
  const location = useLocation();
  const [isBurgerButtonActive, setIsBurgerButtonActive] = useState(false);

  function handleBurgerMenuClick() {
    setIsBurgerButtonActive(true);
  };

  function handleCloseMenuClick() {
    setIsBurgerButtonActive(false);
  };

  function handleLogout() {
    onLogout();
    setIsBurgerButtonActive(false);
  };

  return (
    <header className='header'>
      {(location.pathname === '/' && isBurgerButtonActive) && (
        <div className='header__menu_active'>
          <p className='header__item header__text'>{email}</p>
          <button
            className='header__item header__button action-button'
            onClick={handleLogout}>Log out</button>
        </div>
      )}
      <div className='header__main'>
        <img
          src={logo}
          alt='Around the U.S. inscription'
          className='header__logo' />

        {location.pathname === '/signin' && (
          <NavLink to='/signup' className='header__item link'>
            Sign up
          </NavLink>
        )}
        {location.pathname === '/signup' && (
          <NavLink to='/signin' className='header__item link'>
            Log in
          </NavLink>
        )}
        {location.pathname === '/' && (
          <>
            {isBurgerButtonActive ? (
              <button
                className='header__close-menu-button action-button'
                onClick={handleCloseMenuClick} />
            ) : (
              <button
                className='header__burger-menu action-button'
                onClick={handleBurgerMenuClick} />
            )}
            <div className='header__menu'>
              <p className='header__item header__text'>{email}</p>
              <button
                className='header__item header__button action-button'
                onClick={onLogout}>Log out</button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
