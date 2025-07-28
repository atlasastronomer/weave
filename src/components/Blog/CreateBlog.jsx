import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import blogService from '/src/services/blogService'
import './Blog.css'

const NewBlog = () => {

  const [token, setToken] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [username, setUsername] = useState('')
  const [author, setAuthor] = useState('Author')

  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedName = localStorage.getItem('name')
    const storedUsername = localStorage.getItem('username')

    setToken(storedToken)
    setAuthor(storedName)
    setUsername(storedUsername)

    if (storedToken) {
      blogService.setToken(storedToken)
    }
  },[])

  const postBlog = async (e) => {
    e.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      content: content,
    }

    await blogService.createBlog(blogObject)

    setTitle('')
    setContent('')
    navigate(`${username}/blogs`)
  }

  return (
    <div>
      <div>
        <form onSubmit={postBlog} className='blog-input-container'>
          <input
            className='blog-title-input-box'
            placeholder='Title'
            value={title}
            onChange = {e => setTitle(e.target.value)}
          />
          <textarea
            className='blog-content-input-box'
            placeholder='Content'
            value={content}
            onChange = {e => setContent(e.target.value)}
          />
          <div className='blog-post-btn-group'>
            <button className='gray-btn' type='button' onClick={() => {navigate(-1)}}>Close</button>
            <button className='blue-btn' type='submit'>Post Blog</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { NewBlog }