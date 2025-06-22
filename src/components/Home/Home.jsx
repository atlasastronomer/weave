import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Avatar } from './Avatar'
import { UserPageNavbar } from '../UserPage/UserPageNavbar'
import { LinkPage } from '../Links/LinkPage'
import { Blog } from '../Blog/Blog'
import { Gallery } from '../Gallery/Gallery'
import avatarService from '/src/services/avatarService'
import wallpaperService from '/src/services/wallpaperService'
import aboutService from '/src/services/aboutService'
import '../UserPage/UserPage.css'

const Home = () => {
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [about, setAbout] = useState()

  const [avatar, setAvatar] = useState(null)
  const [avatarFileInputState, setAvatarFileInputState] = useState('')
  const [avatarPreviewSource, setAvatarPreviewSource] = useState('')
  const [showEditAvatar, setShowEditAvatar] = useState(false)
  
  const [wallpaperUrl, setWallpaperUrl] = useState('')
  const [wallpaperFileInputState, setWallpaperFileInputState] = useState('')
  const [wallpaperPreviewSource, setWallpaperPreviewSource] = useState('')
  const [showEditWallpaper, setShowEditWallpaper] = useState(false)

  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isBlogPage = location.pathname === '/blogs'
  const isGalleryPage = location.pathname === '/gallery'
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedName = localStorage.getItem('name')
    const storedUsername = localStorage.getItem('username')
    setToken(storedToken)
    setName(storedName)
    setUsername(storedUsername)

    if (storedToken) {
      avatarService.setToken(storedToken)
      wallpaperService.setToken(storedToken)
      aboutService.setToken(storedToken)
      loadAvatar()
      loadWallpaper()
      loadAbout()
    }
  }, [])

  /** About */
  const loadAbout = async () => {
    try {
      const res = await aboutService.getAbout()
      setAbout(res.data.about)
    }
    catch (error) {
      console.log('Error in fetching about', error.message)
    }
  }
  
  /** Avatar */
  const loadAvatar = async () => {
    try {
      const res = await avatarService.getAvatar()
      setAvatar(res.data)
    }
    catch (error) {
      console.log('Error in fetching avatar:', error.message)
    }
  }

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

  const handleSubmitAvatarFile = (e) => {
    e.preventDefault()
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
      setShowEditAvatar(false)
    }
    catch (error) {
      console.log('Error in uploading avatar:', error.message)
    }
  }

  /** Wallpaper */
  const loadWallpaper = async () => {
    try {
      const res = await wallpaperService.getWallpaper()
      const wallpaper = res.data
      setWallpaperUrl(`https://res.cloudinary.com/dxmjrqdzj/image/upload/${wallpaper.publicId}`)
    }
    catch (error) {
      console.log('Error in fetching wallpaper:', error.message)
    }
  }

  const handleShowHideWallpaper = () => {
    setShowEditWallpaper(!showEditWallpaper)
    setWallpaperPreviewSource('')
  }

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

  const handleSubmitWallpaperFile = (e) => {
    e.preventDefault()
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
      setShowEditWallpaper(false)
    }
    catch (error) {
      console.log('Error in uploading wallpaper:', error.message)
    }
  }

  return (
      <div className='main-page-wrapper'>
        <div className='avatar-wallpaper-wrapper'>
          <div
            className='userpage-wallpaper'
            style={{
              backgroundImage: wallpaperUrl
                ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${wallpaperUrl})`
                : 'none',
            }}
          ></div>
          <Avatar avatar={avatar} />
        </div>
        <p className='userpage-name'>{name}</p>
        <p className='userpage-username'>@{username}</p>
        <p className='userpage-about'>{about}</p>
        <UserPageNavbar />
        {showEditAvatar &&
          <div className='home-upload-container'>
            <form onSubmit={handleSubmitAvatarFile} className='form-container'>
              <div className='post-upload-btn-group'>
                <input type='file' name='image' accept="image/png, image/jpeg, image/jpg, image/avif, image/webp" onChange={handleAvatarFileInputChange} />
                <button type='submit' className='upload-delete-btn'>Set Avatar</button>
              </div>
            </form>
          </div>
        }
        <hr className='line-break' style={{ width: '100%', border: 'none', height: '1px', backgroundColor: '#ccc' }} />
        {isHomePage && (<LinkPage />)}
        {isBlogPage && (<Blog/>)}
        {isGalleryPage && (<Gallery/>)}
      </div>
  )
}

export { Home }