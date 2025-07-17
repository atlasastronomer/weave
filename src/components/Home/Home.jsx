import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Blogpost } from '../Blog/Blogpost'
import { GalleryPost } from '../Gallery/GalleryPost'

import userService from '../../services/userService'
import followService from '../../services/followService'
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
  const [openMoreId, setOpenMoreId] = useState(null)
  const [following, setFollowing] = useState([])
  const [media, setMedia] = useState([])
  const [followingMedia, setFollowingMedia] = useState([])

  const toggleMore = (id) => {
    setOpenMoreId(prev => (prev === id ? null: id))
  }

  const navigate = useNavigate()
  const location = useLocation()

  const onForYouPage = location.pathname === '/for_you'
  const onFollowingPage = location.pathname === '/following'

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
    followService.setToken(storedToken)

    const getFollowing = async () => {
      const payload = JSON.parse(atob(storedToken.split('.')[1]))
      const username = payload.username

      const followData = await followService.getUserFollow(username)
      setFollowing(followData.following || [])
    }

    getFollowing()
  }, [])

  useEffect(() => {
    const fetchAllMedia = async () => {
      const blogs = await blogService.getBlogs()
      const posts = await galleryService.getGallery()

      const typedBlogs = blogs.map(blog => ({...blog, type: 'blog'}))
      const typedPosts = posts.map(post => ({...post, type: 'post'}))

      const media = [...typedBlogs, ...typedPosts]
      media.sort((a, b) => new Date(b.date) - new Date(a.date))

      setMedia(media)
    }

    fetchAllMedia()
  }, [])

  useEffect(() => {
    setFollowingMedia(media.filter(item => following.includes(item.user.id)))
  }, [following, media])
  
  return (
    <div className='main-page-wrapper'>
      <div className='feed-toggle-navbar' style={{ marginBottom: '1.25rem' }}>
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
      {onForYouPage ?
        <div className='media-board'>
          {media.map(item => (
            <div key={item.id}>
              {item.type === 'blog' && (
                <Blogpost
                  username={item.user.username}
                  blog={item}
                  isMoreOpen={openMoreId === item.id}
                  toggleMore={toggleMore}
                  isSelf={false}
                  handleDeleteBlog={() => {deleteBlog(item.id)}}
                />
              )}
              {item.type === 'post' && (
                <GalleryPost
                  username={item.user.username}
                  post={item}
                  isMoreOpen={openMoreId === item.id}
                  toggleMore={toggleMore}
                  isSelf={false}
                  handleDeletePost={() => deletePost(item.id)}
                />
              )}
            </div>
          ))}
        </div>
      :
        <div className='media-board'>
          {followingMedia.map(item => (
            <div key={item.id}>
              {item.type === 'blog' && (
                <Blogpost
                  username={item.user.username}
                  blog={item}
                  isMoreOpen={openMoreId === item.id}
                  toggleMore={toggleMore}
                  isSelf={false}
                  handleDeleteBlog={() => {deleteBlog(item.id)}}
                />
              )}
              {item.type === 'post' && (
                <GalleryPost
                  username={item.user.username}
                  post={item}
                  isMoreOpen={openMoreId === item.id}
                  toggleMore={toggleMore}
                  isSelf={false}
                  handleDeletePost={() => deletePost(item.id)}
                />
              )}
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export { Home }
