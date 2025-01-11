import React from 'react'
import { useLocation } from 'react-router-dom'
import { PAGE_TITLES } from '../constants'

const Appbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { pathname } = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className='header'>
      <h1 className='header-title'>{PAGE_TITLES[pathname]}</h1>

      <div className='header-actions'>
        <button className='header-action-btn' aria-label='Messages'>
          <div className='count'></div>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='header-icon'
          >
            <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' />
          </svg>
        </button>

        <button className='header-action-btn' aria-label='Notifications'>
          <div className='count'></div>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='header-icon'
          >
            <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
            <path d='M13.73 21a2 2 0 0 1-3.46 0' />
          </svg>
        </button>

        <button
          className='header-action-btn profile-btn'
          aria-label='Profile'
          onClick={toggleMenu}
        >
          <div className='profile-avatar'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className='header-icon'
            >
              <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
              <circle cx='12' cy='7' r='4' />
            </svg>
          </div>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className={`header-icon ${isMenuOpen ? 'rotate' : ''}`}
          >
            <path d='M6 9l6 6 6-6' />
          </svg>
        </button>

        {isMenuOpen && (
          <div className='popup-menu'>
            <button className='popup-menu-item'>Edit Profile</button>
            <button className='popup-menu-item'>Change Password</button>
            <button className='popup-menu-item'>Manage Notifications</button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Appbar
