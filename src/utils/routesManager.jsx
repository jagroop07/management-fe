import React from 'react'
import { Route, Routes } from 'react-router-dom'

import LoginPage from '../pages/login/Login'
import RegisterPage from '../pages/register/Register'

import DashboardLayout from '../layouts/DashboardLayout'
import Candidate from '../pages/candidate/Candidate'
import Employee from '../pages/employee/Employee'
import Attendance from '../pages/attendance/Attendance'

const RoutesManager = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/' element={<DashboardLayout />}>
        <Route index element={<Candidate />} />
        <Route path='/employee' element={<Employee />} />
        <Route path='/attendance' element={<Attendance />} />
      </Route>
    </Routes>
  )
}

export default RoutesManager
