import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const Home = () => {
  const [fileUrl, setFileUrl] = useState(null)
  const profilePicRef = useRef(null)

  const handleProfilePic = (e) => {
    e.preventDefault()

    const file = profilePicRef.current.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setFileUrl(url)
    }
    else {
      console.log('No file selected')
    }
  }

  return (
    <>
      <form onSubmit={handleProfilePic}>
        <input type='file' ref={profilePicRef} accept='image/png, image/jpg, image/jpeg'/>
        <button type='submit'>Set profile picture</button>
      </form>

      <div className="upper-container">
        <img src={fileUrl || '/assets/default-avatar.jpg'} className='profile-picture'/>
      </div>
    </>
  )
}

export { Home }