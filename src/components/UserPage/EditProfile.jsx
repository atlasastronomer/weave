import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '../Home/Avatar'
import userService from '../../services/userService'
import profileService from '../../services/profileService'
import avatarService from '../../services/avatarService'
import wallpaperService from '../../services/wallpaperService'
import './EditProfile.css'
import './UserPage.css'

const EditProfile = () => {
  // Variables
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  
  const [avatar, setAvatar] = useState('')
  const [avatarFileInputState, setAvatarFileInputState] = useState('')
  const [avatarPreviewSource, setAvatarPreviewSource] = useState('')

  const [wallpaperUrl, setWallpaperUrl] = useState('')
  const [wallpaperFileInputState, setWallpaperFileInputState] = useState('')
  const [wallpaperPreviewSource, setWallpaperPreviewSource] = useState('')

  const navigate = useNavigate()

  // Use Effect
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUsername = localStorage.getItem('username')
    setUsername(storedUsername)
    avatarService.setToken(storedToken)
    profileService.setToken(storedToken)
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

  // Avatar functions
  const handleAvatarFileInputChange = (e) => {
    const file = e.target.files[0]
    previewAvatarFile(file)
  }

  const previewAvatarFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setAvatarPreviewSource(reader.result)
    }
  }

  const handleSubmitAvatarFile = () => {
    if (!avatarPreviewSource) return

    uploadAvatarImage(avatarPreviewSource)
  }

  const uploadAvatarImage = async(base64EncodedImage) => {
    try {
      const res = await avatarService.uploadAvatar({
        data: base64EncodedImage
      })

      setAvatar(res.data)
      setAvatarFileInputState('')
      setAvatarPreviewSource('')
    }
    catch (error) {
      console.log('Error in uploading avatar:', error.message)
    }
  }

  // Wallpaper Functions
  const handleWallpaperFileInputChange = (e) => {
    const file = e.target.files[0]
    previewWallpaperFile(file)
  }

  const previewWallpaperFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setWallpaperPreviewSource(reader.result)
    }
  }

  const handleSubmitWallpaperFile = () => {
    if (!wallpaperPreviewSource) return

    uploadWallpaperImage(wallpaperPreviewSource)
  }

  const uploadWallpaperImage = async(base64EncodedImage) => {
    try {
      const res = await wallpaperService.uploadWallpaper({
        data: base64EncodedImage
      })
      const uploadedWallpaperUrl = `https://res.cloudinary.com/dxmjrqdzj/image/upload/${res.data.publicId}`
      setWallpaperUrl(uploadedWallpaperUrl)
      setWallpaperFileInputState('')
      setWallpaperPreviewSource('')
    }
    catch (error) {
      console.log('Error in uploading wallpaper:', error.message)
    }
  }

  // Save Profile
  const saveProfile = async (e) => {
    e.preventDefault()

    const res = await profileService.updateProfile({name: name, about: about})
    setAbout(res.about)
    setName(res.name)

    handleSubmitAvatarFile()
    handleSubmitWallpaperFile()
    navigate(`/${username}`)
  }

  return (
    <form onSubmit={saveProfile} className='edit-profile-wrapper'>
      <div className='edit-avatar-wallpaper-container'>
        <div className='avatar-wallpaper-wrapper'>
          <label htmlFor='wallpaperInput'>
            {!wallpaperPreviewSource ?
              <div
                className='edit-profile-wallpaper'
                style={{
                  backgroundImage: wallpaperUrl
                    ? `url(${wallpaperUrl})`
                    : 'none',
                }}>
              </div>
              :
              <div
                className='edit-profile-wallpaper'
                style={{
                  backgroundImage: wallpaperPreviewSource
                    ? `url(${wallpaperPreviewSource})`
                    : 'none',
                }}>
              </div>
            }
          </label>
          <input
            type='file'
            accept='image/png, image/jpeg, image/jpg, image/avif, image/webp'
            id='wallpaperInput'
            style={{display: 'none'}}
            onChange={handleWallpaperFileInputChange}
          />
          <div className='edit-avatar-wrapper'>
            <label htmlFor='avatarInput'>
              {!avatarPreviewSource ?
                <Avatar avatar={avatar} className='edit-profile-avatar' />
                :
                <img src={avatarPreviewSource} alt='' className='edit-profile-avatar'/>
              }
            </label>
          </div>
          <input
            type='file'
            accept='image/png, image/jpeg, image/jpg, image/avif, image/webp'
            id='avatarInput'
            style={{display: 'none'}}
            onChange={handleAvatarFileInputChange}
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
        <button className='gray-btn' onClick={() => navigate(`/${username}`)}> Cancel </button>
        <button type='submit' className='blue-btn'> Save Profile </button>
      </div>
    </form>
  )
}

export { EditProfile }