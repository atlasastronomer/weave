import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './UserPageNavbar.css'

const NavButton = ({name, style, icon}) => {
  return (
    <div className='nav-button-wrapper' >
      <p className='nav-button-label'> {name} </p>
      <p className={`fa-${style} ${icon} fa-sm nav-button-icon`} style={{margin: '0px'}}></p>
    </div>
  )
}

const UserPageNavbar = ({username}) => {
  const [token, setToken] = useState('')
  const [userUsername, setUserUsername] = useState()

  useEffect(() => {
    setToken(localStorage.getItem('token'))
    setUserUsername(username)
  }, [username])
  
  return (
    <div className='userpage-nav-bar'>
      <Link to={`/${userUsername}`} className='span'><NavButton name='Home' style='solid' icon='fa-home'/></Link>
      <Link to={`/${userUsername}/blogs`} className='span'><NavButton name='Blog' style='solid' icon='fa-blog'/></Link>
      <Link to={`/${userUsername}/gallery`} className='span'><NavButton name='Gallery' style='solid' icon='fa-image'/></Link>
    </div>
  )
}

export { UserPageNavbar }