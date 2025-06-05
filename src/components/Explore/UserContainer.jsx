import { useNavigate, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Avatar } from '../Home/Avatar'
import './UserContainer.css'

const UserContainer = ({user, openModal}) => {
  const name = user.name
  const username = user.username
  const avatar = user.avatar

  return (
    <div className='explore-user-container'>
      <p className='user-username'>{name}</p>
      <p className='user-name'>{username}</p>
      <Avatar avatar = {avatar}/>
      <button className='upload-delete-btn' onClick={() => openModal(user.username)}>View Profile</button>
    </div>
  )
}

export { UserContainer }
