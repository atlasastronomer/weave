import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'
import { SideBar } from './Sidebar'
import { Create } from '../Home/Create'

import './Dashboard.css'

const Dashboard = () => {
  const [token, setToken] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  const openCreate = () => {
    setShowCreate(true)
    navigate('/new')
  }

  const closeCreate = () => {
    setShowCreate(false)
    navigate(-1)
  }

  return(
    <>
      {showCreate && <Create closeCreate={closeCreate}/>}
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