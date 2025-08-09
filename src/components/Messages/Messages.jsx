import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { SearchEntry } from './SearchEntry'
import { Avatar } from '../Home/Avatar'

import userService from '/src/services/userService'
import messagesService from '../../services/messagesService'
import formatTimestamp from '../../services/formatTimestamp'
import socket from '../../socket'

import './MessagesSearchbar.css'
import './MessagesConversation.css'

const Messages = () => {
  const [token, setToken] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [senderID, setSenderID] = useState()
  const [recipientID, setRecipientID] = useState()
  const { username } = useParams()
  const [recipientName, setRecipientName] = useState()
  const [recipientUsername, setRecipientUsername] = useState()
  const [recipientAbout, setRecipientAbout] = useState()
  const [recipientAvatar, setRecipientAvatar] = useState()
  const [messages, setMessages] = useState([])

  const [chatInput, setChatInput] = useState('')
  const textareaRef = useRef(null)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (!storedToken) return

    const getToken = () => {
      setToken(storedToken)
      userService.setToken(storedToken)
      messagesService.setToken(storedToken)
    }

    const getID = () => {
      const payload = JSON.parse(atob(storedToken.split('.')[1]))
      const userID = payload.id
      setSenderID(userID)
      socket.emit('join', userID)
    }

    const loadUsers = async () => {
      try {
        const users = await userService.getAllUsers()
        setUsers(users)
      } catch (error) {
        console.error('Failed to load users:', error)
      }
    }

    getToken()
    getID()
    loadUsers()
  }, [])

  useEffect(() => {
    const handleReceiveMessage = (incomingMessage) => {
      setMessages(prev => [...prev, incomingMessage])
    }
    socket.on('receive_message', handleReceiveMessage)
    
    return () => {
      socket.off('receive_message', handleReceiveMessage)
    }
  }, [])

  useEffect(() => {
    setSearchValue('')
    setFilteredUsers([])
  }, [location])

  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredUsers([])
      return
    }
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(searchValue.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [searchValue, users])

  useEffect(() => {
    if (!token || !username) return
    const fetchData = async () => {
      try {
        const user = await userService.getUser(username)
        setRecipientID(user.id) 
        setRecipientAvatar(user.avatar)
        setRecipientName(user.name)
        setRecipientUsername(user.username)
        setRecipientAbout(user.about?.about || 'Hello! Welcome to my space.')
      } catch (error) {
        console.error('Error fetching user:', error)
      }
      try {
        const fetchedMessages = await messagesService.getMessagesWith(username)
        setMessages(fetchedMessages)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }
    fetchData()
  }, [token, username])

  const openConversation = (username) => {
    navigate(`/messages/${username}`)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (chatInput.trim() === '') return
    socket.emit('send_message', {
      token: token,
      recipientUsername: username,
      content: chatInput,
    })
    setChatInput('')
    textareaRef.current.style.height = "auto"
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(e)
    }
  }

  const handleChange = (e) => {
    setChatInput(e.target.value)
    textareaRef.current.style.height = "auto"
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }

  return (
    <form className='messages-page-wrapper' onSubmit={e => sendMessage(e)}>
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
              <SearchEntry user={user} key={user.id} openConversation={() => openConversation(user.username)} />
            )}
          </div>
        )}
      </div>

      <div className='messages-conversation-wrapper'>
        {username ? (
          <>
            <div className='messages-conversation-header' onClick={() => { navigate(`/${recipientUsername}`) }}>
              <Avatar avatar={recipientAvatar} classname={'messages-conversation-header-avatar'} />
              <p className='messages-conversation-title'>{recipientName}</p>
              <p className='messages-conversation-username'>@{recipientUsername}</p>
              <p className='messages-conversation-about'>{recipientAbout}</p>
            </div>
            <div className='messages-conversation-body'>
              {messages.map(msg => (
                <div key={msg.id}>
                  {msg.sender === senderID ? (
                    <div className="sender-message-container">
                      <div className="message-bubble-wrapper">
                        <div className="sender-message">{msg.content}</div>
                        <div className="message-timestamp">{formatTimestamp(msg.timestamp)}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="recipient-message-container">
                      <div className="message-bubble-wrapper">
                        <div className="recipient-message">{msg.content}</div>
                        <div className="message-timestamp">{formatTimestamp(msg.timestamp)}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className='messages-conversation-footer'>
              <div className='messages-conversation-chatbox'>
                <textarea
                  ref={textareaRef}
                  className='messages-conversation-text-input'
                  placeholder='Message...'
                  value={chatInput}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  rows={1}
                />
                <i className="fa-solid fa-paper-plane fa-blue fa-send-message" type='submit' onClick={e => sendMessage(e)}></i>
              </div>
            </div>
          </>
        ) : (
          <div>
            <p className='messages-conversation-no_selection-title'>Select a message</p>
            <p className='messages-conversation-no_selection-text'>No thread picked yet. Weave a new conversation or select one to start spinning.</p>
          </div>
        )}
      </div>
    </form>
  )
}

export { Messages }
