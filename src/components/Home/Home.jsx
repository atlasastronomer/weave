import { useState, useEffect } from 'react'
import avatarService from '/src/services/avatarService'
import wallpaperService from '/src/services/wallpaperService'
import linkService from '/src/services/linkService'
import { Avatar } from './Avatar'
import { MediaLink } from './MediaLink'
import './Home.css'

const Home = () => {
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  const [avatar, setAvatar] = useState(null)
  const [avatarFileInputState, setAvatarFileInputState] = useState('')
  const [avatarPreviewSource, setAvatarPreviewSource] = useState('')
  const [showEditAvatar, setShowEditAvatar] = useState(false)
  
  const [wallpaperUrl, setWallpaperUrl] = useState('')
  const [wallpaperFileInputState, setWallpaperFileInputState] = useState('')
  const [wallpaperPreviewSource, setWallpaperPreviewSource] = useState('')
  const [showEditWallpaper, setShowEditWallpaper] = useState(false)

  const [links, setLinks] = useState([])
  const [showEditLinks, setShowEditLinks] = useState(false)

  const [title, setTitle] = useState('')
  const [mediaLink, setMediaLink] = useState('')

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
      linkService.setToken(storedToken)
      loadAvatar()
      loadWallpaper()
      getLinks()
    }
  }, [])

  useEffect(() => {
    const wallpaperToSet = wallpaperPreviewSource || wallpaperUrl
    if (wallpaperToSet) {
      document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${wallpaperToSet}')`
    }
    return () => {
      document.body.style.backgroundImage = wallpaperUrl ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${wallpaperUrl}')` : ''
    }
  }, [wallpaperPreviewSource, wallpaperUrl])


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

  const handleShowHideAvatar = () => {
    setShowEditAvatar(!showEditAvatar)
    setAvatarPreviewSource('')
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
      const cloudName = 'dxmjrqdzj'
      const res = await wallpaperService.getWallpaper()
      const result = res.data
      setWallpaperUrl(`https://res.cloudinary.com/dxmjrqdzj/image/upload/${result.publicId}`)
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

  /** Links */
  const getLinks = async () => {
    try {
      const res = await linkService.getLinks()
      setLinks(res.data)
    }
    catch (error) {
      console.log('Error in fetching links:', error.message)
    }
  }

  const postLink = async (e) => {
    e.preventDefault()

    const linkObject = {
      title: title,
      mediaLink: mediaLink,
    }

    const res = await linkService.createLink(linkObject)

    setLinks(links.concat(res.data))
    setTitle('')
    setMediaLink('')
    setShowEditLinks(false)
  }

  const deleteLink = async (id) => {
    try {
      linkService.deleteLink(id)
      setLinks(links.filter(l => l.id !== id))
    }
    catch (err) {
      console.log(err, 'Failed to Delete Link')
    }
  }

  const editLinks = () => {
    setShowEditLinks(!showEditLinks)
  }

  /** Return */
  return(
    <div>
      <div className='wallpaper-upload-container'>
        <div onClick={handleShowHideWallpaper} className='pencil-icon'>
          {showEditWallpaper ? <i className="fa-solid fa-xmark fa-lg fa-icon"></i> : <i className="fa-solid fa-pencil fa-lg fa-icon"></i>}
        </div>
        {showEditWallpaper && 
          <div className='home-upload-container'>
            <form onSubmit={handleSubmitWallpaperFile} className='form-container'>
              <div className='post-upload-btn-group'>
                <input type='file' name='image' accept="image/png, image/jpeg, image/jpg, image/avif, image/webp" onChange={handleWallpaperFileInputChange} />
                <button type='submit' className='upload-delete-btn'>Set Wallpaper</button>
              </div>
            </form>
          </div>
        }
      </div>
      <div className='home-container'>
        <p className='home-username'>{username}</p>
        <p className='home-name'>{name}</p>
        {!avatarPreviewSource ? <Avatar avatar = {avatar}/>
          :
          <img
            src={avatarPreviewSource}
            alt="chosen"
            className="avatar-preview"
          />
        }
        <div onClick={handleShowHideAvatar} className='pencil-icon'>
          {showEditAvatar ? <i className="fa-solid fa-xmark fa-lg fa-icon"></i> : <i className="fa-solid fa-pencil fa-lg fa-icon"></i>}
        </div>
        {showEditAvatar &&
          <div className='home-upload-container'>
            <form onSubmit={handleSubmitAvatarFile} className='form-container'>
              <div className='post-upload-btn-group'>
                <input type='file' name='image' accept="image/png, image/jpeg, image/jpg, image/avif, image/webp" onChange={handleAvatarFileInputChange} />
                <button type='submit' className='upload-post-btn'>Set Avatar</button>
              </div>
            </form>
          </div>
        }
      <hr className='line-break' style={{ width: '100%', border: 'none', height: '1px', backgroundColor: '#ccc' }} />
        <p className='links-title-display'>Links</p>
        <div className='links-container'>
          {links.map((link) =>
            <MediaLink key={link.id} link={link} handleDeleteLink={() => deleteLink(link.id)} showDeleteLink={showEditLinks}/>
          )}
        </div>
        <div onClick={editLinks} className='pencil-icon'>
          {showEditLinks ? <i className="fa-solid fa-xmark fa-lg fa-icon"></i> : <i className="fa-solid fa-pencil fa-lg fa-icon"></i>}
        </div>
        {showEditLinks && 
          <form onSubmit={postLink} className='link-input-container'>
            <input
              className='link-input-box'
              placeholder='Title'
              value={title}
              onChange = {e => setTitle(e.target.value)}
            />
            <input
              className='link-input-box'
              placeholder='Link'
              value={mediaLink}
              onChange = {e => setMediaLink(e.target.value)}
            />
            <button className='blog-post-button' type='submit'>Add Link</button>
          </form>
        }
      </div>
    </div>
  )
}

export { Home }