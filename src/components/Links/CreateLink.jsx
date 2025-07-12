import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MediaLink } from './MediaLink'
import linkService from '/src/services/linkService'
import './LinkPage.css'

const NewLink = () => {
  const [token, setToken] = useState('')

  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [mediaLink, setMediaLink] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUsername = localStorage.getItem('username')

    setToken(storedToken)
    setUsername(storedUsername)

    if (storedToken) {
      linkService.setToken(storedToken)
    }
  }, [])

  const postLink = async (e) => {
    e.preventDefault()

    const linkObject = {
      title: title,
      mediaLink: mediaLink,
    }

    await linkService.createLink(linkObject)

    setTitle('')
    setMediaLink('')
    navigate(`${username}`)
  }

  return (
    <form onSubmit={postLink} className='blog-input-container'>
      <input
        className='link-title-input-box'
        placeholder='Link Title'
        value={title}
        onChange = {e => setTitle(e.target.value)}
      />
      <input
        className='link-url-input-box'
        placeholder='Type or paste link'
        value={mediaLink}
        onChange = {e => setMediaLink(e.target.value)}
      />
      <div className='link-post-btn-group'>
        <button className='gray-btn' type='button' onClick={() => {navigate(-1)}}>Close</button>
        <button className='blue-btn' type='submit'>Post Link</button>
      </div>
    </form>
  )
}

export { NewLink }