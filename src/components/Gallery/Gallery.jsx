import { useState, useEffect } from 'react'
import {Cloudinary} from "@cloudinary/url-gen"
import { crop, fill, scale, fit, thumbnail, pad } from '@cloudinary/url-gen/actions/resize'
import { format } from '@cloudinary/url-gen/actions/delivery'
import galleryService from '/src/services/galleryService'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners'

import { GalleryPost } from './GalleryPost'
import { Link } from 'react-router-dom'
import './Gallery.css'

const Gallery = () => {

  const [token, setToken] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState('')
  const [posts, setPosts] = useState([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedName = localStorage.getItem('name')
    setToken(storedToken)
    setAuthor(storedName)

    if (storedToken) {
      galleryService.setToken(storedToken)
      loadImages()
    }
  }, [])

  const loadImages = async () => {
    try {
      const res = await galleryService.getGallery()
      setPosts(res.data.reverse())
    }
    catch (error) {
      console.log(error)
    }
  }

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

  const handleSubmitFile = (e) => {
    e.preventDefault()
    if (!previewSource) return

    const date = String(new Date())
    uploadImage(previewSource, title, date, author)
  }

  const uploadImage = async (base64EncodedImage, title, date, author) => {
    try {
      const res = await galleryService.uploadToGallery({
        data: base64EncodedImage,
        title,
        date,
        author
      })
      setPosts([res.data, ...posts])
      setTitle('')
      setFileInputState('')
      setPreviewSource('')
      setShow(false)
    }
    catch (error) {
      console.log('Error in uploading image:', error.message)
    }
  }

  const deletePost = async (id) => {
    try {
      galleryService.deletePost(id)
      setPosts(posts.filter(p => p.id !== id))
    }
    catch (err) {
      console.log(err, 'Failed to Delete Post')
    }
  }

  return (
    <div>
      {token ?
        <div>
          <div className='gallery-title-container'>
            <div onClick={() => setShow(!show)} className='plus-minus'>
              {show ? <i className="fa-solid fa-minus fa-lg fa-icon"></i> : <i className="fa-solid fa-plus fa-lg fa-icon"></i>}
            </div>
          </div>

          {show &&
            <div className='gallery-upload-container'>
              <form onSubmit={handleSubmitFile} className='form-container'>
                <input
                  className='post-title-input-box'
                  placeholder='Title'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <div className='post-upload-btn-group'>
                  <input type='file' name='image' accept='image/png, image/jpeg, image/jpg, image/avif, image/webp' onChange={handleFileInputChange} />
                  <button type='submit' className='upload-delete-btn'>Post Image</button>
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
          }

          <div className='gallery-board'>
            {posts.map((post, i) =>
              <GalleryPost
                key={i}
                post={post}
                handleDeletePost={() => deletePost(post.id)}
              />
            )}
          </div>
        </div>
        :
        <div className='gallery-login-container'>
          <p className='gallery-login-title'>Weave</p>
          <p className='gallery-login-text'>Sign up or log in to view your gallery</p>
          <Link to='/login' className='gallery-login-btn'> Login </Link>
        </div>
      }
    </div>
  )
}

export { Gallery }
