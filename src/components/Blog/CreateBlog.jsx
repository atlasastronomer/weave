import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import blogService from '/src/services/blogService'
import './Blog.css'

const NewBlog = () => {
  const [token, setToken] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [username, setUsername] = useState('')
  const [author, setAuthor] = useState('Author')

  const titleRef = useRef(null)
  const contentRef = useRef(null)

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
  }, [])

  const autoResize = (ref) => {
    if (ref?.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    autoResize(titleRef)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
    autoResize(contentRef)
  }

  const postBlog = async (e) => {
    e.preventDefault()

    const blogObject = {
      title,
      author,
      content,
    }

    await blogService.createBlog(blogObject)

    setTitle('')
    setContent('')
    navigate(`${username}/blogs`)
  }

  return (
    <div>
      <form onSubmit={postBlog} className='blog-input-container'>
        <textarea
          ref={titleRef}
          className='blog-title-input-box'
          placeholder='Title'
          value={title}
          onChange={handleTitleChange}
          rows={1}
        />
        <textarea
          ref={contentRef}
          className='blog-content-input-box'
          placeholder='Content'
          value={content}
          onChange={handleContentChange}
          rows={1}
        />
        <div className='blog-post-btn-group'>
          <button
            className='gray-btn'
            type='button'
            onClick={() => navigate(-1)}
          >
            Close
          </button>
          <button className='blue-btn' type='submit'>
            Post Blog
          </button>
        </div>
      </form>
    </div>
  )
}

export { NewBlog }
