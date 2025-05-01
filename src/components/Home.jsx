import { useState, useEffect } from 'react'
import {Cloudinary} from "@cloudinary/url-gen";
import avatarService from '/src/services/avatarService';

import { Avatar } from './HomePfp'
import './Home.css'

const Home = () => {
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState('')
  const [show, setShow] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedName = localStorage.getItem('name')
    const storedUsername = localStorage.getItem('username')
    setToken(storedToken)
    setName(storedName)
    setUsername(storedUsername)

    if (storedToken) {
      avatarService.setToken(storedToken)
      loadAvatar()
    }
  }, [])

  const loadAvatar = async () => {
    try {
      const res = await avatarService.getAvatar()
      setAvatar(res.data[0])
    }
    catch {
      console.log("Error in fetching resume:", error.message)
    }
  }

  const handleShowHide = () => {
    setShow(!show)
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
      setShow(false)
    }
    catch (error) {
      console.log('Error in uploading avatar:', error.message)
    }
  }

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
        <div onClick={handleShowHide} className='pencil-icon'>
          {show ? <i className="fa-solid fa-xmark fa-lg fa-icon"></i> : <i className="fa-solid fa-pencil fa-lg fa-icon"></i>}
        </div>
        {show &&
          <div className='home-upload-container'>
            <form onSubmit={handleSubmitFile} className='form-container'>
              <div className='post-upload-btn-group'>
                <input type='file' name='image' accept="image/png, image/jpeg, image/jpg, image/avif, image/webp" onChange={handleFileInputChange} />
                <button type='submit' className='upload-post-btn'>Post Image</button>
              </div>
            </form>
          </div>
        }
      </div>
    </div>
  )
}

export { Home }