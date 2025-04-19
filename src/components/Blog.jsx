import { useState, useEffect } from 'react'
import axios from 'axios'
import { Blogpost } from './Blogpost.jsx'
import axiosService from '/src/services/axios'
import { Link } from 'react-router-dom'
import './Blog.css'

const Blog = () => {
  
  const [blogs, setBlogs] = useState([])

  const [token, setToken] = useState('')
  const [title, setTitle] = useState('Title')
  const [author, setAuthor] = useState('Author')
  const [content, setContent] = useState('Content')
  const [hasBlogs, setHasBlogs] = useState(false)

  useEffect(() => {
    axiosService.setToken(localStorage.getItem('token'))
    setToken(localStorage.getItem('token'))

    axiosService.getMyBlogs('http://localhost:3001/api/my-blogs/')
    .then(res => {
      setBlogs(res.data)
    })

    if (blogs) {
      setHasBlogs(true)
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

    const res = await axiosService.createBlog('http://localhost:3001/api/blogs', blogObject)

    setBlogs(blogs.concat(res.data))
    console.log(res.data)
    setTitle('Title')
    setAuthor('Author')
    setContent('Content')
  }

  const deleteBlog = async (id) => {
    try {
      const url = `http://localhost:3001/api/blogs/${id}`
      const res = await axios.delete(url)
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
        <p className='blog-page-title'> My Blogs </p>
        <div>
          {blogs.map((blog) => 
            <Blogpost key={blog.id} blog={blog} handleDeleteBlog={() => deleteBlog(blog.id)}/>
          )}
        </div>
        <form onSubmit={postBlog}>
          <input
            value={title}
            onChange = {e => setTitle(e.target.value)}
          />
          <input
            value={author}
            onChange = {e => setAuthor(e.target.value)}
          />
          <input
            value={content}
            onChange = {e => setContent(e.target.value)}
          />
          <button type='submit'>post</button>
        </form>
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