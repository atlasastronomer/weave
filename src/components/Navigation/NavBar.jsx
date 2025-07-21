import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import './NavBar.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  useEffect(() => {
    setToken(localStorage.getItem('token'))
    setUsername(localStorage.getItem('username'))
  }, [])

  return (
    <>
      <div className='nav-bar-wrapper'>
        <div className='nav-bar'>
          <Link to='/for_you' className='span'><NavButton name='Home' style='solid' icon='fa-home'/></Link>
          <Link to='/explore' className='span'><NavButton name='Explore' style='solid' icon='fa-compass'/></Link>
          <Link to={`/${username}`} className='span'><NavButton name='Profile' style='solid' icon='fa-user'/></Link>
          <Link to={'/messages'} className='span'><NavButton name='Messages' style='solid' icon='fa-envelope'/></Link>
          {token ? <Link to='/account' className='span'><NavButton name='Settings' style='solid' icon='fa-gear'/></Link> : <Link to='/login' className='span'><NavButton name='Settings' style='solid' icon='fa-arrow-right-to-bracket'/></Link>}
        </div>
        <button className='create-button' onClick={() => navigate('/new')}>
          <i className={'fa-solid fa-lg fa-pencil'}></i>
          <p className='create-button-label'>Create</p>
        </button>
      </div>
    </>
  )
}

export { NavBar }