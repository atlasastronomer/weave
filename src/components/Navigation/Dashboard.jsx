import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'
import { useState, useEffect } from 'react'
import './Dashboard.css'

const Dashboard = () => {
  return(
    <div className='dashboard'>
      <NavBar />
      <div className='main-page'>
        <Outlet/>
      </div>
    </div>
  )
}

export { Dashboard }