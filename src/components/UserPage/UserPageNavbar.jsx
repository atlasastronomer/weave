import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import './UserPageNavbar.css'
import { useState, useEffect } from 'react'

const NavButton = ({name, style, icon}) => {
  return (
    <div className='nav-button-wrapper' >
      <p className='nav-button-label'> {name} </p>
      <p className={`fa-${style} ${icon} fa-sm nav-button-icon`} style={{margin: '0px'}}></p>
    </div>
  )
}

const UserPageNavbar = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])
  
  return (
    <div className='userpage-nav-bar'>
      <Link to='/' className='span'><NavButton name='Home' style='solid' icon='fa-home'/></Link>
      <Link to='/blogs' className='span'><NavButton name='Blog' style='regular' icon='fa-address-card'/></Link>
      <Link to='/gallery' className='span'><NavButton name='Gallery' style='solid' icon='fa-blog'/></Link>
    </div>
  )
}

export { UserPageNavbar }