import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import './NavBar.css'
import { useState, useEffect } from 'react'

const NavButton = ({name, style, icon}) => {
  return (
    <div className='nav-button-wrapper' >
      <p className={`fa-${style} ${icon} fa-sm nav-button-icon`} style={{margin: '0px'}}></p>
      <p className='nav-button-label'> {name} </p>
    </div>
  )
}

const NavBar = () => {
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    setToken(localStorage.getItem('token'))
    setUsername(localStorage.getItem('username'))
  }, [])
  
  return (
    <div className='nav-bar'>
      <Link to='/' className='span'><NavButton name='Home' style='solid' icon='fa-home'/></Link>
      <Link to='/explore' className='span'><NavButton name='Explore' style='solid' icon='fa-compass'/></Link>
      <Link to={`/${username}`} className='span'><NavButton name='Profile' style='solid' icon='fa-user'/></Link>
      {token ? <Link to='/account' className='span'><NavButton name='Settings' style='solid' icon='fa-gear'/></Link> : <Link to='/login' className='span'><NavButton name='Settings' style='solid' icon='fa-arrow-right-to-bracket'/></Link>}
    </div>
  )
}

export { NavBar }