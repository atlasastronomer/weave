import { MediaLink } from './MediaLink'
import { useState, useEffect } from 'react'
import linkService from '/src/services/linkService'
import './LinkPage.css'

const LinkPage = () => {
  const [token, setToken] = useState('')
  const [links, setLinks] = useState([])
  const [showEditLinks, setShowEditLinks] = useState(false)

  const [title, setTitle] = useState('')
  const [mediaLink, setMediaLink] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedName = localStorage.getItem('name')
    const storedUsername = localStorage.getItem('username')
    setToken(storedToken)

    if (storedToken) {
      linkService.setToken(storedToken)
      getLinks()
    }
  }, [])

  const editLinks = () => {
    setShowEditLinks(!showEditLinks)
  }

  const getLinks = async () => {
    try {
      const res = await linkService.getLinks()
      setLinks(res.data)
    }
    catch (error) {
      console.log('Error in fetching links:', error.message)
    }
  }

  const postLink = async (e) => {
    e.preventDefault()

    const linkObject = {
      title: title,
      mediaLink: mediaLink,
    }

    const res = await linkService.createLink(linkObject)

    setLinks(links.concat(res.data))
    setTitle('')
    setMediaLink('')
    setShowEditLinks(false)
  }

  const deleteLink = async (id) => {
    try {
      linkService.deleteLink(id)
      setLinks(links.filter(l => l.id !== id))
    }
    catch (err) {
      console.log(err, 'Failed to Delete Link')
    }
  }

  return (
    <div>
      <div className='links-container'>
        {links.map((link) =>
          <MediaLink key={link.id} link={link} handleDeleteLink={() => deleteLink(link.id)} showDeleteLink={showEditLinks}/>
        )}
      </div>
      <div onClick={editLinks} className='pencil-icon'>
        {showEditLinks ? <i className="fa-solid fa-xmark fa-lg fa-icon"></i> : <i className="fa-solid fa-pencil fa-lg fa-icon"></i>}
      </div>
      {showEditLinks && 
        <form onSubmit={postLink} className='link-input-container'>
          <input
            className='blog-content-input-box'
            placeholder='Title'
            value={title}
            onChange = {e => setTitle(e.target.value)}
          />
          <input
            className='blog-content-input-box'
            placeholder='Link'
            value={mediaLink}
            onChange = {e => setMediaLink(e.target.value)}
          />
          <button className='gray-btn' type='submit'>Add Link</button>
        </form>
      }
    </div>
  )
}

export { LinkPage }