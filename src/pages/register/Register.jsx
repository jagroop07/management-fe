import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom' 
import styles from './register.module.css'
import { axiosClient } from '../../utils/axiosClient'

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate() 

  const onSubmit = async data => {
    console.log('Registration Data:', data)

    await axiosClient.post('/admin/register', {
      email: data.email,
      password: data.password,
      name: data.fullName
    })

    navigate('/login')
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
          <h3>Welcome to Dashboard</h3>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor='fullName'>Full Name*</label>
              <input
                id='fullName'
                type='text'
                {...register('fullName', { required: 'Full Name is required' })}
              />
              {errors.fullName && (
                <span className={styles.error}>{errors.fullName.message}</span>
              )}
            </div>

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

            <div className={styles.formGroup}>
              <label htmlFor='confirmPassword'>Confirm Password*</label>
              <input
                id='confirmPassword'
                type='password'
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: value =>
                    value === watch('password') || 'Passwords do not match'
                })}
              />
              {errors.confirmPassword && (
                <span className={styles.error}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button type='submit' className={styles.submitButton}>
              Register
            </button>
          </form>
          <p className={styles.loginLink}>
            Already have an account? <a href='/login'>Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
