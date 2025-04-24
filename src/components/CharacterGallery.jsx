import { useState, useEffect } from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { crop, fill, scale, fit, thumbnail, pad } from '@cloudinary/url-gen/actions/resize';
import { format } from '@cloudinary/url-gen/actions/delivery';
import axios from 'axios'
import axiosService from '/src/services/axios'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import './CharacterGallery.css'

const CharacterGallery = () => {

  const [token, setToken] = useState('')

  const [title, setTitle] = useState('Title')
  const [author, setAuthor] = useState('Author')
  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState('')
  const [imageIds, setImageIds] = useState([])

  useEffect(() => {
    axiosService.setToken(localStorage.getItem('token'))
    setToken(localStorage.getItem('token'))
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
      const res = await axiosService.getMyGallery('http://localhost:3001/api/my-gallery')
      const data = res.data

      setImageIds(data)
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
      const res = await axiosService.uploadToGallery('http://localhost:3001/api/upload-gallery', {data: base64EncodedImage, title: title, date: date, author: author})
      setImageIds(posts.concat(res.data.imgId))
      setTitle('')
      setFileInputState('')
      setPreviewSource('')
    }
    catch (error) {
      console.log("Error in uploading image")
    }
  }

  return (
    <>
      <div className='gallery-upload-container'>
        <p className='gallery-upload-title'>Upload</p>
        <form onSubmit={handleSubmitFile} className='form-container'>
            <input
              className='post-title-input-box'
              placeholder='Title'
              value={title}
              onChange = {e => setTitle(e.target.value)}
            />
          <div className='post-upload-btn-group'>
            <input type='file' name='image' onChange={handleFileInputChange} value={fileInputState}/>
            <button type='submit' className='upload-post-btn'>Submit</button>
          </div>
        </form>
        {previewSource && (
          <img src={previewSource} alt="chosen"
          style={{width: '300px', margin: 'auto'}}
          />
        )}
        <div className='gallery-board'>
          {imageIds && imageIds.map((image, i) =>
            (<AdvancedImage
              key={i}
              cldImg={cld.image(image.publicId).resize(scale().width(500)).roundCorners(byRadius(20)).format('png')}
            />
            ))}
        </div>
      </div>
    </>
  )
}

export { CharacterGallery }