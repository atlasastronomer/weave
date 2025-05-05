import { useState, useEffect } from 'react'
import avatarService from '/src/services/avatarService'
import linkService from '/src/services/linkService'

import { Avatar } from './Avatar'
import { MediaLink } from './MediaLink';
import './Home.css'

const Home = () => {
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  const [avatar, setAvatar] = useState(null)
  const [links, setLinks] = useState([])
  const [showEditLinks, setShowEditLinks] = useState(false)

  const [showAvatar, setShowAvatar] = useState(false)

  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState('')

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
      linkService.setToken(storedToken)
      loadAvatar()
      getLinks()
    }
  }, [])

  /** Avatar */
  const loadAvatar = async () => {
    try {
      const res = await avatarService.getAvatar()
      setAvatar(res.data[0])
    }
    catch (error) {
      console.log('Error in fetching resume:', error.message)
    }
  }

  const handleShowHideAvatar = () => {
    setShowAvatar(!showAvatar)
    setPreviewSource('')
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }
  
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleSubmitFile = (e) => {
    e.preventDefault()
    if (!previewSource) return

    uploadImage(previewSource)
  }

  const uploadImage = async(base64EncodedImage) => {
    try {
      const res = await avatarService.uploadAvatar({
        data: base64EncodedImage
      })

      setAvatar(res.data)
      setFileInputState('')
      setPreviewSource('')
      setShowAvatar(false)
    }
    catch (error) {
      console.log('Error in uploading avatar:', error.message)
    }
  }

  /** Links */
  const getLinks = async () => {
    try {
      const res = await linkService.getLinks()
      setLinks(res.data)
      console.log(res.data)
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
      <div className='home-container'>
          <p className='home-username'>{username}</p>
          <p className='home-name'>{name}</p>
          {!previewSource ? <Avatar avatar = {avatar}/>
            :
            <img
              src={previewSource}
              alt="chosen"
              style={{ width: '200px', height: '200px', borderRadius: '20px', objectFit: 'contain'}}
              className='gallery-preview-image'
            />
          }
          <div onClick={handleShowHideAvatar} className='pencil-icon'>
            {showAvatar ? <i className="fa-solid fa-xmark fa-lg fa-icon"></i> : <i className="fa-solid fa-pencil fa-lg fa-icon"></i>}
          </div>
          {showAvatar &&
            <div className='home-upload-container'>
              <form onSubmit={handleSubmitFile} className='form-container'>
                <div className='post-upload-btn-group'>
                  <input type='file' name='image' accept="image/png, image/jpeg, image/jpg, image/avif, image/webp" onChange={handleFileInputChange} />
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