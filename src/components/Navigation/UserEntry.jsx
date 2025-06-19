import { useNavigate, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Avatar } from '../Home/Avatar'

const UserEntry = ({user, openModal}) => {
  const name = user.name
  const username = user.username
  const avatar = user.avatar

  return (
    <div className=''>
      <p className=''>{name}</p>
      <p className=''>{username}</p>
      <Avatar avatar = {avatar}/>
      <button className='' onClick={() => openModal(user.username)}>View Profile</button>
    </div>
  )
}

export { UserEntry }
