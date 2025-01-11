import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './style.css'
import { axiosClient } from '../../utils/axiosClient'
import { apiRoutes } from '../../utils/apiRoutes'

export default function EmployeeForm ({ id, refresh }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const fetchEmployeeData = async id => {
    let res = await axiosClient.get(`${apiRoutes.fetchEmployee}/${id}`)

    return {
      ...res?.data?.details,
      joining_date: new Date(res?.data?.details?.joining_date)
        .toISOString()
        .split('T')[0]
    }
  }

  useEffect(() => {
    if (id) {
      fetchEmployeeData(id).then(data => {
        console.log({ data })
        reset(data)
      })
    }
  }, [id, reset])

  const onSubmit = async data => {
    const formData = new FormData()

    Object.keys(data).forEach(key => {
      if (key === 'profile') {
        if (data[key]?.[0] instanceof File) {
          formData.append(key, data[key][0])
          return
        }

        return
      }

      formData.append(key, data[key])
    })

    console.log({ data })

    await axiosClient.patch(`${apiRoutes.UpdateEmployee}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='candidate-form'>
      <p>ID: {id || 'new'}</p>

      <div className='form-row'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Full Name*'
            {...register('name', { required: 'Full Name is required' })}
          />
          {errors.name && <p className='error'>{errors.name.message}</p>}
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address*'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email format'
              }
            })}
          />
          {errors.email && <p className='error'>{errors.email.message}</p>}
        </div>
      </div>

      <div className='form-row'>
        <div className='form-group'>
          <input
            type='tel'
            placeholder='Phone Number*'
            {...register('phone_number', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Invalid phone_number number'
              }
            })}
          />
          {errors.phone_number && (
            <p className='error'>{errors.phone_number.message}</p>
          )}
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Department*'
            {...register('department', { required: 'Department is required' })}
          />
          {errors.department && (
            <p className='error'>{errors.department.message}</p>
          )}
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Position*'
            {...register('position', { required: 'Position is required' })}
          />
          {errors.position && (
            <p className='error'>{errors.position.message}</p>
          )}
        </div>
      </div>

      <div className='form-row'>
        <div className='form-group'>
          <input
            type='date'
            placeholder='Date of Joining*'
            {...register('joining_date', {
              required: 'Date of Joining is required'
            })}
          />
          {errors.joining_date && (
            <p className='error'>{errors.joining_date.message}</p>
          )}
        </div>
        <div className='form-group'>
          <input type='file' {...register('profile')} />
          {errors.profile && <p className='error'>{errors.profile.message}</p>}
        </div>
      </div>

      <div className='form-group'>
        <button type='submit' className='primary-btn'>
          Submit
        </button>
      </div>
    </form>
  )
}
