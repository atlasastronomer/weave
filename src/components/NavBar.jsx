import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import './NavBar.css'

const NavButton = ({name, onClick}) => {
  return (
    <div className='nav-button' onClick={onClick}>
      <p> {name} </p>
    </div>
  )
}

const NavBar = () => {
  return (
    <div className='nav-bar'>
      <Link to='/'><NavButton name='Home'/></Link>
      <Link to='/about'><NavButton name='About'/></Link>
      <Link to='/blogs'><NavButton name='Blog'/></Link>
      <Link to='/gallery'><NavButton name='Gallery'/></Link>
      <Link to='/login'><NavButton name='Login'/></Link>
    </div>
  )
}

export { NavBar }