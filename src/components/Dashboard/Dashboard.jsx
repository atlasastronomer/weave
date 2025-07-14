import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../Navigation/NavBar'
import { SideBar } from '../Navigation/Sidebar'
import { Create } from '../Home/Create'
import { EditProfile } from '../UserPage/EditProfile'

import './Dashboard.css'

const Dashboard = () => {
  const [token, setToken] = useState(null)
  
  const location = useLocation()
  const isCreating = location.pathname.startsWith('/new')
  const isEditingProfile = location.pathname.startsWith('/profile')

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  return(
    <>
      {(isCreating) && <Create/>}
      {(isEditingProfile) && <EditProfile/>}
      
      <div className='dashboard'>
        {token && <NavBar/>}
        <div className={token ? 'main-page' : ''}>
          <Outlet/>
        </div>
        {token && <SideBar/>}
      </div>
    </>
  )
}

export { Dashboard }