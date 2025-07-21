import { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { SearchEntry } from './SearchEntry'
import { Avatar } from '../Home/Avatar'
import userService from '/src/services/userService'
import './MessagesSearchbar.css'
import './MessagesConversation.css'

const Messages = () => {
  const [token, setToken] = useState('')
    
  const [searchValue, setSearchValue] = useState('')
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  
  const { username } = useParams()
  const [userName, setUserName] = useState()
  const [userUsername, setUserUsername] = useState()
  const [userAbout, setUserAbout] = useState()
  const [userAvatar, setUserAvatar] = useState()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
    userService.setToken(storedToken)

    if (storedToken) {
      loadUsers()
    }
  }, [])

  const loadUsers = async () => {
    try {
      const users = await userService.getAllUsers()
      setUsers(users)
    } catch (error) {
      console.error('Failed to load users:', error)
    }
  }

  useEffect(() => {
    setSearchValue('')
    setFilteredUsers([])
  }, [location])

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

  useEffect(() => {
    const fetchUser = async () => {
      if (!username) return

      try {
        const user = await userService.getUser(username)
        setUserAvatar(user.avatar)
        setUserName(user.name)
        setUserUsername(user.username)
        setUserAbout(user.about?.about || 'Hello! Welcome to my space.')
      } catch (error) { 
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [username])

  const openConversation = (username) => {
    navigate(`/messages/${username}`)
  }
  return (
  <div className='messages-page-wrapper'>
    <div className='messages-search-wrapper'>
      <p className='messages-search-title'>Messages</p>
      <div className='messages-search-bar'>
        <i className="fa-solid fa-search fa-lg fa-icon"></i>
        <input
          className='messages-search-field'
          placeholder='Search Direct Messages'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </div>
      {filteredUsers.length !== 0 && (
        <div className='messages-search-results'>
          {filteredUsers.map((user) => 
            <SearchEntry user={user} key={user.id} openConversation={() => openConversation(user.username)}/>
          )}
        </div>
      )}
    </div>
    <div className='messages-conversation-wrapper'>
      {username ?
        <div className='messages-conversation-header' onClick={() => {navigate(`/${userUsername}`)}}>
          <Avatar avatar={userAvatar} classname={'messages-conversation-avatar'}/>
          <p className='messages-conversation-title'>{userName}</p>
          <p className='messages-conversation-username'>@{userUsername}</p>
          <p className='messages-conversation-about'>{userAbout}</p>
        </div>
        :
        <div>
          <p className='messages-conversation-no_selection-title'>Select a message</p>
          <p className='messages-conversation-no_selection-text'>No thread picked yet. Weave a new conversation or select one to start spinning.</p>
        </div>  
      }
    </div>
  </div>
  )
}

export { Messages }