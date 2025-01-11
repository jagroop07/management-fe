import React from 'react'
import './MyModal.css'

const MyModal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <div className='flex-row modal-header'>
          <h3>{title}</h3>
          <div className='modal-close' onClick={onClose}>
            &times;
          </div>
        </div>
        <div className='modal-main-content'>{children}</div>
      </div>
    </div>
  )
}

export default MyModal
