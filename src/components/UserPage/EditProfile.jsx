import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '../Home/Avatar'
import avatarService from '../../services/avatarService'
import aboutService from '../../services/aboutService'
import wallpaperService from '../../services/wallpaperService'
import userService from '../../services/userService'
import './EditProfile.css'
import './UserPage.css'

const EditProfile = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [about, setAbout] = useState('')
  const [wallpaperUrl, setWallpaperUrl] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUsername = localStorage.getItem('username')
    setUsername(storedUsername)
    avatarService.setToken(storedToken)
    aboutService.setToken(storedToken)
    wallpaperService.setToken(storedToken)
  }, [])

  useEffect(() => {
    if (!username) {
      return
    }

    const fetchUser = async () => {
      try {
        const user = await userService.getUser(username)
        setName(user.name)
        setAvatar(user.avatar)
        setAbout(user.about?.about || 'Hello! Welcome to my space.')
        const wallpaperId = user.wallpaper?.publicId || 'binknaxauzfs2dj7mcae'
        setWallpaperUrl(`https://res.cloudinary.com/dxmjrqdzj/image/upload/${wallpaperId}`)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [username])

  return (
    <div className='edit-profile-wrapper'>
      <div className='edit-avatar-wallpaper-container'>
        <div className='avatar-wallpaper-wrapper'>
          <label htmlFor='wallpaperInput'>
            <div
              className='edit-profile-wallpaper'
              style={{
                backgroundImage: wallpaperUrl
                  ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${wallpaperUrl})`
                  : 'none',
              }}>
            </div>
          </label>
          <input
            type='file'
            accept='image/*'
            id='wallpaperInput'
            style={{display: 'none'}}
          />
          <div className='edit-avatar-wrapper'>
            <label htmlFor='avatarInput'>
              <Avatar avatar={avatar} classname='edit-profile-avatar' />
            </label>
          </div>
          <input
            type='file'
            accept='image/*'
            id='avatarInput'
            style={{display: 'none'}}
          />
        </div>
      </div>
      <div className='edit-profile-text-container'>
        <p className='edit-profile-text-title'>Name</p>
        <input
          className='edit-name-about'
          value={name || ''}
          onChange = {e => setName(e.target.value)}
        />
      </div>
      <div className='edit-profile-text-container'>
        <p className='edit-profile-text-title'>About</p>
        <textarea
          className='edit-name-about'
          value={about || ''}
          onChange = {e => setAbout(e.target.value)}
        />
      </div>
      <div className='edit-profile-btn-row'>
        <button className='gray-btn' onClick={() => navigate(-1)}> Cancel </button>
        <button className='blue-btn' onClick={() => {}}> Save Profile </button>
      </div>
    </div>
  )
}

export { EditProfile }