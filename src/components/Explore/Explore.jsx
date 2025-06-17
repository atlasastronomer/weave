import { useNavigate, Routes, Route, useLocation } from 'react-router-dom'
import { UserModal } from '../UserModal/UserModal.jsx'
import { UserContainer } from './UserContainer.jsx'
import { useState, useEffect } from 'react'
import userService from '/src/services/userService'
import './Explore.css'

const Explore = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const modalIsOpen = location.pathname.startsWith('/explore') && location.pathname.split('/').length === 3

  const [token, setToken] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    const storedToken = localStorage.getItem('token')

    setToken(storedToken)

    if(storedToken) {
      loadUsers()
    }
  }, [])

  const loadUsers = async () => {
      const res = await userService.getAllUsers()
      setUsers(res.data)
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.classList.add('active-modal')
    }
    else {
      document.body.classList.remove('active-modal')
    }

    return () => document.body.classList.remove('active-modal')
  }, [modalIsOpen])

  const openModal = (username) => {
    navigate(`/explore/${username}`)
  }
  
  const closeModal = () => navigate('/explore')

  return (
    <div className='main-page-wrapper'>
      <div className='user-grid'>
        {users.map((user) => 
        <UserContainer user={user} key={user.id} openModal={openModal}/>
      )}
      </div>

      <Routes>
        <Route path=':username' element={<UserModal closeModal={closeModal} />} />
      </Routes>
    </div>
  )
}

export { Explore }
