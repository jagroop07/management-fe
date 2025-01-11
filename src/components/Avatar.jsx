import React from 'react'
import { BASE_URL } from '../constants'

const Avatar = ({ url }) => {
  return (
    <div className='center'>
      <img
        className='avatar'
        src={
          url
            ? `${BASE_URL}/${url}`
            : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fbig.php%3Fi%3D1033651&psig=AOvVaw1gCabXxNbz3FSK_6Alzk40&ust=1736688650737000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCnlMLj7YoDFQAAAAAdAAAAABAJ"
        }
        alt=''
      />
    </div>
  )
}

export default Avatar
