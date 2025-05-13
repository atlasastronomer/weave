import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wallpaper } from '../Wallpaper'
import './Account.css'

const Account = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    localStorage.removeItem("username")

    navigate('/login')
    window.location.reload()
  }
  return(
    <>
      <Wallpaper/>
      <div className='account-wrapper'>
        <p className='logout-title'> Logout </p>
        <button className='logout-btn' onClick={handleLogout}> Logout </button>
      </div>
    </>
  )
}

export { Account }
