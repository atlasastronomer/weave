import { useState, useEffect } from 'react'
import axios from 'axios'
import { Blogpost } from './Blogpost.jsx'
import blogService from '/src/services/blogs'

const Blog = () => {
  
  const [blogs, setBlogs] = useState([])

  const [date, setDate] = useState('')
  const [title, setTitle] = useState('Title')
  const [author, setAuthor] = useState('Author')
  const [content, setContent] = useState('Content')

  useEffect(() => {
    blogService.getAll()
    .then(res => {
      setBlogs(res.data)
    })
  },[])

  const postBlog = (e) => {
    e.preventDefault()

    const blogObject = {
      date: String(new Date()),
      title: title,
      author: author,
      content: content,
    }

    blogService.create(blogObject)
    .then(res => {
      setBlogs(blogs.concat(res.data))
      setDate('')
      setTitle('Title')
      setAuthor('Author')
      setContent('Content')
    })
  }

  const deleteBlog = (id) => {
    const url = `http://localhost:3001/blogs/${id}`
    axios.delete(url)
    .then(res => {
      setBlogs(blogs.filter(b => b.id !== id))
    })
    .catch(err => {
      console.log('Failed to Delete Blog')
    })
  }

  return (
    <div>
      <p> Blogs </p>
      <div>
        {blogs.map(blog => 
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
  )
}

export { Blog }