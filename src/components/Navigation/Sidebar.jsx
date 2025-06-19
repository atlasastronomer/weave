import { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import userService from '/src/services/userService'
import { UserEntry } from './UserEntry.jsx'
import './Sidebar.css'

const SideBar = () => {
  const navigate = useNavigate()

  const [token, setToken] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)

    if (storedToken) {
      loadUsers()
    }
  }, [])

  const loadUsers = async () => {
    try {
      const res = await userService.getAllUsers()
      setUsers(res.data)
    } catch (error) {
      console.error('Failed to load users:', error)
    }
  }

  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredUsers([])
      return
    }

    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchValue.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [searchValue, users])

  return (
    <div className='side-bar'>
      <div className='search-bar'>
        <i className="fa-solid fa-search fa-lg fa-icon"></i>
        <input
          className='search-field'
          placeholder='Search Weave'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </div>
      <div className='search-results'>
        {filteredUsers.map((user) => 
          <UserEntry user={user} key={user.id} openModal={() => navigate(`${user.username}`)}/>
        )}
      </div>
    </div>
  )
}

export { SideBar }
