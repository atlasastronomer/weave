import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import './NavBar.css'
import { useState, useEffect } from 'react'

const NavButton = ({name, style, icon}) => {
  return (
    <div className='nav-button-wrapper' >
      <p className='nav-button-label'> {name} </p>
      <p className={`fa-${style} ${icon} fa-sm nav-button-icon`} style={{margin: '0px'}}></p>
    </div>
  )
}

const NavBar = ({ token }) => {

  const [currentToken, setCurrentToken] = useState(token);

  useEffect(() => {
    setCurrentToken(token);
  }, [token]);
  
  return (
    <div className='nav-bar'>
      <Link to='/' className='span'><NavButton name='Home' style='solid' icon='fa-home'/></Link>
      <Link to='/about' className='span'><NavButton name='About' style='regular' icon='fa-address-card'/></Link>
      <Link to='/blogs' className='span'><NavButton name='Blog' style='solid' icon='fa-blog'/></Link>
      <Link to='/gallery' className='span'><NavButton name='Gallery' style='solid' icon='fa-paintbrush'/></Link>
      {token ? <Link to='/account' className='span'><NavButton name='Account' style='solid' icon='fa-user'/></Link> : <Link to='/login' className='span'><NavButton name='Account' style='solid' icon='fa-arrow-right-to-bracket'/></Link>}
    </div>
  )
}

export { NavBar }