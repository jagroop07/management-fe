import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { axiosClient } from '../utils/axiosClient'
import MyModal from './MyModal'

const Sidebar = () => {
  const [logoutModal, setLogoutModal] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const logout = async () => {
    await axiosClient.post('/admin/logout')
    navigate('/login')
  }

  return (
    <aside className='sidebar'>
      <div className='logo'>
        <img src='/svgs/logo.svg' alt='' />
      </div>

      <div className='search-container'>
        <input type='search' placeholder='Search' className='search-input' />
      </div>

      <nav className='sidebar-nav'>
        <div className='nav-section'>
          <h3 className='section-title'>Recruitment</h3>
          <ul className='nav-list'>
            <Link
              to={'/'}
              className={`nav-item ${pathname == '/' && 'active'}`}
            >
              <svg
                className='nav-icon'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z' />
                <path d='M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z' />
              </svg>
              <span>Candidates</span>
            </Link>
          </ul>
        </div>

        <div className='nav-section'>
          <h3 className='section-title'>Organization</h3>
          <ul className='nav-list'>
            <Link
              to={'/employee'}
              className={`nav-item ${pathname == '/employee' && 'active'}`}
            >
              <svg
                className='nav-icon'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' />
              </svg>
              <span>Employees</span>
            </Link>
            <Link
              to={'/attendance'}
              className={`nav-item ${pathname == '/attendance' && 'active'}`}
            >
              <svg
                className='nav-icon'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
              <span>Attendance</span>
            </Link>
            <Link
              to={'/leaves'}
              className={`nav-item ${pathname == '/leaves' && 'active'}`}
            >
              <svg
                className='nav-icon'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
              </svg>
              <span>Leaves</span>
            </Link>
          </ul>
        </div>

        <div className='nav-section'>
          <h3 className='section-title'>Others</h3>
          <ul className='nav-list'>
            <Link className={`nav-item`} onClick={() => setLogoutModal(true)}>
              <svg
                className='nav-icon'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
              </svg>
              <span>Logout</span>
            </Link>
          </ul>
        </div>
      </nav>

      <MyModal
        title={'Confirm Logout'}
        isOpen={logoutModal}
        onClose={() => setLogoutModal(false)}
      >
        <div class='logout-popup'>
          <p>Are you sure you want to log out?</p>
          <div class='buttons'>
            <button class='confirm-btn' onClick={() => logout()}>
              Logout
            </button>
            <button class='cancel-btn' onClick={() => setLogoutModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </MyModal>
    </aside>
  )
}

export default Sidebar
