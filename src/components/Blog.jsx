import { useState, useEffect } from 'react'
import axios from 'axios'
import { Blogpost } from './Blogpost.jsx'
import blogService from '/src/services/blogService'
import { Link } from 'react-router-dom'
import './Blog.css'

const Blog = () => {
  
  const [blogs, setBlogs] = useState([])
  
  const [token, setToken] = useState('')
  const [title, setTitle] = useState('Title')
  const [author, setAuthor] = useState('Author')
  const [content, setContent] = useState('Content')
  const [hasBlogs, setHasBlogs] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedName = localStorage.getItem('name')

    setToken(storedToken)
    setAuthor(storedName)

    if (storedToken) {
      blogService.setToken(storedToken)
      
      blogService.getBlogs()
      .then(res => {
        setBlogs(res.data.reverse())
      })
  
      if (blogs) {
        setHasBlogs(true)
      }
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

    setBlogs(blogs.concat(res.data).reverse())
    console.log(res.data)
    setTitle('Title')
    setContent('Content')
    setShow(false)
  }

  const deleteBlog = async (id) => {
    try {
      blogService.deleteBlog(id)
      setBlogs(blogs.filter(b => b.id !== id))
    }
    catch (err) {
      console.log(err, 'Failed to Delete Blog')
    }
  }

  return (
    <div>
      {token ?
      <div>
        <div className='blog-title-container'>
          <div onClick={() => setShow(!show)} className='plus-minus'>
            {show ? <i className="fa-solid fa-minus fa-lg fa-icon"></i> : <i className="fa-solid fa-plus fa-lg fa-icon"></i>}
          </div>
        </div>
        {show && 
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
            <button className='blog-post-button' type='submit'>Post Blog</button>
          </form>
        }
        <div>
          {blogs.map((blog) => 
            <Blogpost key={blog.id} blog={blog} handleDeleteBlog={() => deleteBlog(blog.id)}/>
          )}
        </div>
      </div>
      :
      <div className='blog-login-container'>
        <p className='blog-login-title'>Weave</p>
        <p className='blog-login-text'>Sign up or log in to view your blogs</p>
        <Link to='/login' className='blog-login-btn'> Login </Link>
      </div>
      }
    </div>
  )
}

export { Blog }