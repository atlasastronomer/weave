import { useState, useEffect } from 'react'
import userService from '/src/services/userService'
import './Sidebar.css'

const SideBar = () => {
  const [token, setToken] = useState('')

  const [searchValue, setSearchValue] = useState('')
  const [users, setUsers] = useState([])
  const [visibleUsers, setVisibleUsers] = useState([])

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

  return (
    <div className='side-bar'>
      <div className='search-bar'>
        <i className="fa-solid fa-search fa-lg fa-icon"></i>
        <input
          className='search-field'
          placeholder='Search Weave'
          value={searchValue}
          onChange = {e => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  )
}

export { SideBar }