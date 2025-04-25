import { useState, useEffect } from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { crop, fill, scale, fit, thumbnail, pad } from '@cloudinary/url-gen/actions/resize';
import { format } from '@cloudinary/url-gen/actions/delivery';
import galleryService from '/src/services/galleryService'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';

import { GalleryPost } from './CharacterGalleryPost';
import './CharacterGallery.css'

const CharacterGallery = () => {

  const [token, setToken] = useState('')

  const [title, setTitle] = useState('Title')
  const [author, setAuthor] = useState('Author')

  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState('')

  const [posts, setposts] = useState([])
  const [show, setShow] = useState(true)
  const [errorMessage, setErrorMessage] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    galleryService.setToken(token)
    setToken(token)
    setAuthor(localStorage.getItem('name'))
    loadImages()
  }, [])

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dxmjrqdzj'
    }
  })

  const loadImages = async () => {
    try {
      const res = await galleryService.getMyGallery('http://localhost:3001/api/my-gallery')
      const data = res.data

      setposts(data)
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
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleSubmitFile = (e) => {
    e.preventDefault()

    if(!previewSource) {
      return
    }

    const date = String(new Date())
    uploadImage(previewSource, title, date, author)
  }

  const uploadImage = async (base64EncodedImage, title, date, author) => {
    console.log(base64EncodedImage)
    try {
      const res = await galleryService.uploadToGallery('http://localhost:3001/api/upload-gallery', {data: base64EncodedImage, title: title, date: date, author: author})
      setposts(posts.concat(res.data))
      setTitle('')
      setFileInputState('')
      setPreviewSource('')
    }
    catch (error) {
      console.log("Error in uploading image:", error.message)
    }
  }

  return (
    <div>
      <div className='gallery-title-container'>
        {/* <p className='gallery-page-title'>Create Post</p> */}
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
              onChange = {e => setTitle(e.target.value)}
            />
          <div className='post-upload-btn-group'>
            <input type='file' name='image' onChange={handleFileInputChange}/>
            <button type='submit' className='upload-post-btn'>Post Image</button>
          </div>
        </form>
        {previewSource && (
          <img
            src={previewSource} alt="chosen"
            style={{width: '300px', margin: '20px auto 0 auto', borderRadius: '15px'}}
            className='gallery-preview-image'
          />
        )}
      </div>
      }
      <div className='gallery-board'>
          {posts && posts.map((post, i) =>
            (
            <GalleryPost
              key={i}
              post={post}
            />
            ))}
        </div>
    </div>
  )
}

export { CharacterGallery }