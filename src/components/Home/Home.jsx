import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Blogpost } from '../Blog/Blogpost'
import { GalleryPost } from '../Gallery/GalleryPost'
import { userService } from '/src/services/userService'
import blogService from '/src/services/blogService'
import galleryService from '/src/services/galleryService'

import './Home.css'

const FeedToggleButton = ({label, onClick, activeTab}) => {
  return (
    <div className='feed-toggle-btn'
      onClick={onClick}
      style={activeTab ? {borderBottom: '0.2rem solid var(--blue-color)'} : {}}>
      <p className='feed-toggle-label'>{label}</p>
    </div>
  )
}

const Home = () => {
  const [token, setToken] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [posts, setPosts] = useState([])
  const [openMoreId, setOpenMoreId] = useState(null)

  const toggleMore = (id) => {
    setOpenMoreId(prev => (prev === id ? null: id))
  }

  const navigate = useNavigate()
  const location = useLocation()

  const onForYouPage = location.pathname === '/for_you'
  const onFollowingPage = location.pathname === '/following'

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  useEffect(() => {
    const fetchAllMedia = async () => {
      const blogs = await blogService.getBlogs()
      const posts = await galleryService.getGallery()
      setBlogs(blogs)
      setPosts(posts)
    }

    fetchAllMedia()
  })

  return (
    <div className='main-page-wrapper'>
      <div className='feed-toggle-navbar'>
        <FeedToggleButton
          label='For You'
          onClick={() => {navigate('/for_you')}}
          activeTab={onForYouPage ? true : false}
        />
        <FeedToggleButton 
          label='Following'
          onClick={() => {navigate('/following')}}
          activeTab={onFollowingPage ? true : false}
        />
      </div>
      <div>
        {blogs.map((blog) => 
          <Blogpost
            username={''}
            key={blog.id}
            blog={blog}
            isMoreOpen={openMoreId === blog.id}
            toggleMore={toggleMore}
            isSelf={false}
            handleDeleteBlog={() => {deleteBlog(blog.id)}}
          />
        )}
      </div>
    </div>
  )
}

export { Home }