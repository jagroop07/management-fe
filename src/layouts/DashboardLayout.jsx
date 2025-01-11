import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


import Appbar from '../components/Appbar'
import Sidebar from '../components/Sidebar'
import { axiosClient } from '../utils/axiosClient'

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const checkLogin = async () => {
    try {
      await axiosClient.get('/verification')
      setLoading(false)
    } catch (error) {
      navigate('/login')
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  if (loading) return 'Loading...'

  return (
    <div>
      <Appbar />
      <Sidebar />
      <main className='mainContent'>
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
