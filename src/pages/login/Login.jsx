import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import styles from './login.module.css'
import { BASE_URL } from '../../constants'

import { axiosClient } from '../../utils/axiosClient'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async data => {
    try {
      const response = await axiosClient.post(`${BASE_URL}/admin/login`, data)
      if (response.data.success) {
        alert(response.data.message) 
        
        navigate('/')
      } else {
        alert('Login failed')
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred during login')
    }
  }

  return (
    <div className='container'>
      <div className={styles.logo}>
        <img src='/svgs/logo.svg' alt='...' />
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.leftSection}>
          <img
            src='/pics/Rectangle 77.png'
            alt='Dashboard Screenshot'
            className={styles.dashboardImage}
          />
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <p>
            Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
          <div className={styles.dotsContainer}>
            <span className={`${styles.dot} ${styles.active}`}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>

        <div className={styles.rightSection}>
          <h3>Welcome Back</h3>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor='email'>Email Address*</label>
              <input
                id='email'
                type='email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format'
                  }
                })}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='password'>Password*</label>
              <input
                id='password'
                type='password'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long'
                  }
                })}
              />
              {errors.password && (
                <span className={styles.error}>{errors.password.message}</span>
              )}
            </div>

            <button type='submit' className={styles.submitButton}>
              Login
            </button>
          </form>
          <p className={styles.loginLink}>
            Don't have an account? <a href='/register'>Register</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
