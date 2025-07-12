import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import galleryService from '/src/services/galleryService'

import './Gallery.css'

const Gallery = () => {

  const [token, setToken] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [username, setUsername] = useState('')
  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedName = localStorage.getItem('name')
    const storedUsername = localStorage.getItem('username')

    setToken(storedToken)
    setAuthor(storedName)
    setUsername(storedUsername)

    if (storedToken) {
      galleryService.setToken(storedToken)
    }
  }, [])


  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleSubmitFile = async (e) => {
    e.preventDefault()
    if (!previewSource) return

    const date = String(new Date())
    await uploadImage(previewSource, title, date, author)
    navigate(`${username}/gallery`)
  }

  const uploadImage = async (base64EncodedImage, title, date, author) => {
    try {
      const res = await galleryService.uploadToGallery({
        data: base64EncodedImage,
        title,
        date,
        author
      })
      setTitle('')
      setFileInputState('')
      setPreviewSource('')
      setShow(false)
    }
    catch (error) {
      console.log('Error in uploading image:', error.message)
    }
  }

  return (
    <div className='gallery-upload-container'>
      <form onSubmit={handleSubmitFile} className='gallery-form-container'>
        <input
          className='post-title-input-box'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className='post-btn-group'>
          <div className='sub-left'>
            <button className='gray-btn' type='button' onClick={() => navigate(-1)}>Close</button>
          </div>
          <div className='sub-right'>
            <label htmlFor="image-upload" className="custom-file-upload">
              <i className="fa-regular fa-image fa-blue"></i>
            </label>
            <input
              id="image-upload"
              type="file"
              name="image"
              accept="image/png, image/jpeg, image/jpg, image/avif, image/webp"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
            <button type='submit' className='blue-btn'>Post Image</button>
          </div>
        </div>
      </form>
      {previewSource && (
        <img
          src={previewSource}
          alt="chosen"
          style={{ width: '300px', margin: '20px auto 0 auto', borderRadius: '15px' }}
          className='gallery-preview-image'
        />
      )}
    </div>
  )
}

export { Gallery }
