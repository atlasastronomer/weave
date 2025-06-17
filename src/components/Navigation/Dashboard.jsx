import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'
import { SideBar } from './Sidebar'
import { useState, useEffect } from 'react'
import './Dashboard.css'

const Dashboard = () => {
  const [token, setToken] = useState(null)
  
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])
  return(
    <div className='dashboard'>
      {token && <NavBar/>}
      <div className={token ? 'main-page' : ''}>
        <Outlet/>
      </div>
      {token && <SideBar/>}
    </div>
  )
}

export { Dashboard }