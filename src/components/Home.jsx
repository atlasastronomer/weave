import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const Home = () => {
  const [fileUrl, setFileUrl] = useState(null)
  const [bgUrl, setBgUrl] = useState(null)
  const profilePicRef = useRef(null)
  const backgroundImageRef = useRef(null)

  const changeProfilePic = (e) => {
    e.preventDefault()

    const file = profilePicRef.current.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setFileUrl(url)
    }
    else {
      alert('No file selected')
    }
  }

  const changeBackground = (e) => {
    e.preventDefault()

    const file = backgroundImageRef.current.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setBgUrl(url)
    }
    else {
      alert('No file selected')
    }
  }

  const postLink = () => {

  }
  
  return (
    <>
      <form onSubmit={changeProfilePic}>
        <input type='file' ref={profilePicRef} accept='image/png, image/jpg, image/jpeg'/>
        <button type='submit'>Set profile picture</button>
      </form>

      <form onSubmit={changeBackground}>
        <input type='file' ref={backgroundImageRef} accept='image/png, image/jpg, image/jpeg'/>
        <button type='submit'>Set background</button>
      </form>
      
      <div className='upper-container' style={{backgroundImage: bgUrl ? `url(${bgUrl})` : 'url(/assets/default-bg.jpg)'}}>
        <img src={fileUrl || '/assets/default-avatar.jpg'} className='profile-picture'/>
      </div>

      <div className='lower-container'>

      </div>
    </>
  )
}

export { Home }