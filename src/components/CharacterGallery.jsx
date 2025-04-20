import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'cloudinary-react'
import axios from 'axios'
import axiosService from '/src/services/axios'

const CharacterGallery = () => {
  const [imageIds, setImageIds] = useState()
  const [fileInputState, setFileInputState] = useState('')
  const [previewSource, setPreviewSource] = useState('')

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/gallery')
      const data = res.data

      console.log(data)
      setImages(data)
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

    uploadImage(previewSource)
  }

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage)
    try {
      const res = await axiosService.uploadToGallery('http://localhost:3001/api/upload-gallery', {data: base64EncodedImage}, {'Content-type': 'application/json'})
    }
    catch (error) {

    }
  }

  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmitFile}>
        <input type='file' name='image' onChange={handleFileInputChange} value={fileInputState}/>
        <button type='submit'>Submit</button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen"
        style={{height: '300px'}}
        />
      )}
    </div>
  )
}

export { CharacterGallery }