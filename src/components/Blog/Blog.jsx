import { useState, useEffect } from 'react'
import { Blogpost } from './Blogpost.jsx'
import { Link } from 'react-router-dom'
import blogService from '/src/services/blogService'
import './Blog.css'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  
  const [token, setToken] = useState('')
  const [title, setTitle] = useState('Title')
  const [author, setAuthor] = useState('Author')
  const [content, setContent] = useState('Content')

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedName = localStorage.getItem('name')

    setToken(storedToken)
    setAuthor(storedName)

    if (storedToken) {
      blogService.setToken(storedToken)
    }
  },[])

  const postBlog = async (e) => {
    e.preventDefault()

    const blogObject = {
      date: String(new Date()),
      title: title,
      author: author,
      content: content,
    }

    const res = await blogService.createBlog(blogObject)

    setBlogs([res.data, ...blogs])
    setTitle('')
    setContent('')
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
          <input
            className='blog-content-input-box'
            placeholder='Content'
            value={content}
            onChange = {e => setContent(e.target.value)}
          />
          <button className='gray-btn' type='submit'>Post Blog</button>
        </form>
      </div>
    </div>
  )
}

export { Blog }