import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'
import { SideBar } from './Sidebar'
import { Create } from '../Home/Create'
import { useState, useEffect } from 'react'
import './Dashboard.css'

const Dashboard = () => {
  const [token, setToken] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  const openCreateMedia = () => {
    setShowCreate(!showCreate)
    console.log(showCreate)
  }

  return(
    <>
      {showCreate && <Create closeCreate={() => {setShowCreate(false)}}/>}
      <div className='dashboard'>
        {token && <NavBar openCreateMedia={openCreateMedia}/>}
        <div className={token ? 'main-page' : ''}>
          <Outlet/>
        </div>
        {token && <SideBar/>}
      </div>
    </>
  )
}

export { Dashboard }