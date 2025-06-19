import { useNavigate, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { UserAvatar } from './UserAvatar'

const UserEntry = ({user, openModal}) => {
  const name = user.name
  const username = user.username
  const avatar = user.avatar

  return (
    <div className='user-search-row' onClick={() => openModal(user.username)}>
      <UserAvatar avatar = {avatar}/>
      <div className='user-search-info'>
        <p className='user-search-name'>{name}</p>
        <p className='user-search-username'>@{username}</p>
      </div>
    </div>
  )
}

export { UserEntry }
