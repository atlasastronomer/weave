import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'
import { SideBar } from './Sidebar'
import { Create } from '../Home/Create'

import './Dashboard.css'

const Dashboard = () => {
  const [token, setToken] = useState(null)
  
  const location = useLocation()
  const isOnCreateRoute = location.pathname.startsWith('/new')
  
  const navigate = useNavigate()

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  const openCreate = () => {
    navigate('/new')
  }

  const closeCreate = () => {
    navigate(-1)
  }

  return(
    <>
      {(isOnCreateRoute)&& <Create closeCreate={closeCreate}/>}
      <div className='dashboard'>
        {token && <NavBar openCreate={openCreate}/>}
        <div className={token ? 'main-page' : ''}>
          <Outlet/>
        </div>
        {token && <SideBar/>}
      </div>
    </>
  )
}

export { Dashboard }