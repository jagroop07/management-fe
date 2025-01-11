import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './style.css'
import { axiosClient } from '../../utils/axiosClient'
import { apiRoutes } from '../../utils/apiRoutes'

export default function CandidateForm ({ refresh }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    position: '',
    experience: '',
    resume: null
  })

  const handleFileChange = e => {
    const file = e.target.files[0]
    setFormData(prev => ({ ...prev, resume: file }))
  }

  const onSubmit = async data => {
    const formDataToSubmit = new FormData()
    Object.keys(data).forEach(key => {
      if (key === 'resume' && data[key]?.[0] instanceof File) {
        formDataToSubmit.append(key, data[key][0])
        return
      }
      formDataToSubmit.append(key, data[key])
    })

    await axiosClient.post(`${apiRoutes.RegisterCandidate}`, formDataToSubmit, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='candidate-form'>
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
                message: 'Invalid phone number'
              }
            })}
          />
          {errors.phone_number && (
            <p className='error'>{errors.phone_number.message}</p>
          )}
        </div>
        <div className='form-group'>
          <select
            {...register('position', { required: 'Position is required' })}
          >
            <option value=''>Select Position*</option>
            <option value='Intern'>Intern</option>
            <option value='Full Time'>Full Time</option>
            <option value='Junior'>Junior</option>
            <option value='Senior'>Senior</option>
            <option value='Team Lead'>Team Lead</option>
          </select>
          {errors.position && (
            <p className='error'>{errors.position.message}</p>
          )}
        </div>
      </div>

      <div className='form-row'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Experience*'
            {...register('experience', { required: 'Experience is required' })}
          />
          {errors.experience && (
            <p className='error'>{errors.experience.message}</p>
          )}
        </div>
        <div className='form-group'>
          <input
            type='file'
            onChange={handleFileChange}
            {...register('resume', { required: 'Resume is required' })}
            accept='.pdf,.doc,.docx'
          />
        </div>
      </div>

      <div className='form-group checkbox-group'>
        <label className='checkbox-label'>
          <input type='checkbox' required />
          <span className='checkbox-text'>
            I hereby declare that the above information is true to the best of
            my knowledge and belief
          </span>
        </label>
      </div>

      <div className='form-group'>
        <button type='submit' className='primary-btn'>
          Submit
        </button>
      </div>
    </form>
  )
}
