import { useState, useEffect, useRef } from 'react'
import axios from 'axios'


const MediaLink = ({link, handleDeleteLink}) => {
  return(
    <div className='media-link'>
      <a href={link.mediaLink}> {link.title} </a>
    </div>
  )
}

const Home = () => {
  const [pfpUrl, setPfpUrl] = useState(null)
  const [bgUrl, setBgUrl] = useState(null)

  const [links, setLinks] = useState([])

  const [linkTitle, setLinkTitle] = useState('Title')
  const [linkUrl, setLinkUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ')

  const profilePicRef = useRef(null)
  const backgroundImageRef = useRef(null)

  const changeProfilePic = (e) => {
    e.preventDefault()

    const file = profilePicRef.current.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPfpUrl(url)
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

  const addLink = (e) => {
    e.preventDefault()

    console.log(linkTitle)
    console.log(linkUrl)

    const linkObject = {
      title: linkTitle,
      mediaLink: linkUrl
    }
  
    setLinks(links.concat(linkObject))
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
      
      <form onSubmit={addLink}>
        <input
          value={linkTitle}
          onChange = {e => setLinkTitle(e.target.value)}
        />
        <input
          value={linkUrl}
          onChange = {e => setLinkUrl(e.target.value)}
        />
        <button type='submit'> Post Link </button>
      </form>

      <br />
      
      <div className='upper-container' style={{backgroundImage: bgUrl ? `url(${bgUrl})` : 'url(/assets/default-bg.jpg)'}}>
        <img src={pfpUrl || '/assets/default-avatar.jpg'} className='profile-picture'/>
      </div>

      <div className='lower-container'>
        {links.map(link => 
          <MediaLink key={Math.floor(Math.random() * 100000) + 1}link={link} handleDeleteBlog={() => addLink}/>
        )}
      </div>
    </>
  )
}

export { Home }