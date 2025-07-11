import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { UserPageNavbar } from '../UserPage/UserPageNavbar'

import { Avatar } from '../Home/Avatar'
import { MediaLink } from '../Links/MediaLink'
import { Blogpost } from '../Blog/Blogpost'
import { GalleryPost } from '../Gallery/GalleryPost'

import userService from '/src/services/userService'
import avatarService from '/src/services/avatarService'
import aboutService from '/src/services/aboutService'
import blogService from '/src/services/blogService'
import galleryService from '/src/services/galleryService'
import followService from '../../services/followService'

import '../UserPage/UserPage.css'
import '../Blog/Blog.css'
import '../Gallery/Gallery.css'
import '../Links/LinkPage.css'

const UserPage = () => {
  const [token, setToken] = useState('')
  
  const { username } = useParams()
  const [isSelf, setIsSelf] = useState()

  const [userName, setUserName] = useState()
  const [userUsername, setUserUsername] = useState()
  const [userAbout, setUserAbout] = useState()
  const [userAvatar, setUserAvatar] = useState()
  const [userLinks, setUserLinks] = useState([])
  const [userBlogs, setUserBlogs] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [wallpaperUrl, setWallpaperUrl] = useState('')
  const [isFollowing, setIsFollowing] = useState()

  const location = useLocation()
  const isHomePage = location.pathname === `/${username}`
  const isBlogPage = location.pathname === `/${username}/blogs`
  const isGalleryPage = location.pathname === `/${username}/gallery`

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)

    if (storedToken) {
      avatarService.setToken(storedToken)
      aboutService.setToken(storedToken)
      userService.setToken(storedToken)
      followService.setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userService.getUser(username)
        setUserAvatar(user.avatar)
        setUserName(user.name)
        setUserUsername(user.username)
        setUserAbout(user.about?.about || 'Hello! Welcome to my space.')
        setUserLinks(user.links.reverse())
        setUserPosts(user.posts.reverse())
        setUserBlogs(user.blogs.reverse())
        const wallpaperId = user.wallpaper?.publicId || 'binknaxauzfs2dj7mcae'
        setWallpaperUrl(`https://res.cloudinary.com/dxmjrqdzj/image/upload/${wallpaperId}`)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [username])

  useEffect(() => {
    const verifyIsSelf = async () => {
      try {
        const result = await userService.verifyIsSelf(username)
        setIsSelf(result.isSelf)
      }
      catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    verifyIsSelf()
  }, [username])

  const Blog = () => {
    const [openMoreId, setOpenMoreId] = useState(null)

    const toggleMore = (id) => {
      setOpenMoreId(prev => (prev === id ? null: id))
    }

    const deleteBlog = (id) => {
      try {
        blogService.deleteBlog(id)
        setUserBlogs(userBlogs.filter(b => b.id !== id))
      }
      catch (err) {
        console.log(err, 'Failed to Delete Blog')
      }
    }

    return(
      <div className='blog-board'>
        {userBlogs.map((blog) => 
          <Blogpost
            username={username}
            key={blog.id}
            blog={blog}
            isMoreOpen={openMoreId === blog.id}
            toggleMore={toggleMore}
            isSelf={isSelf}
            handleDeleteBlog={() => {deleteBlog(blog.id)}}
          />
        )}
      </div>
    )
  }

  const Gallery = () => {
    const [openMoreId, setOpenMoreId] = useState(null)

    const toggleMore = (id) => {
      setOpenMoreId(prev => (prev === id ? null : id))
    }

    const deletePost = async (id) => {
      try {
        galleryService.deletePost(id)
        setUserPosts(userPosts.filter(p => p.id !== id))
      }
      catch (err) {
        console.log(err, 'Failed to Delete Post')
      }
    }

    return(
      <div className='gallery-board'>
        {userPosts.map((post) =>
          <GalleryPost
            username={username}
            key={post.id}
            user={username}
            post={post}
            isMoreOpen={openMoreId === post.id}
            toggleMore={toggleMore}
            isSelf={isSelf}
            handleDeletePost={() => deletePost(post.id)}
          />
        )}
      </div>
    )
  }

  const LinkPage = () => {
    return(
      <div>
        <p className='page-title'>Links</p>
          <div className='links-container'>
          {userLinks.map((link) =>
            <MediaLink key={link.id} link={link}/>
          )}
      </div>
      </div>
    )
  }

  const handleFollow = async (username) => {
    try {
      const res = await followService.handleFollow(username)
      setIsFollowing(res.following)
    }
    catch (error) {
      console.error('Failed to (un)follow', error)
    }
  }

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        if (!token) {
          return
        }
        const res = await followService.getUserFollow(username)
        const userId = JSON.parse(atob(token.split('.')[1])).id
        const isFollowing = res.followers.includes(userId)
        setIsFollowing(isFollowing)
      }
      catch (error) {
        console.error('Failed to fetch follow status', error)
      }
    }
    fetchFollowStatus()
  }, [username, token])


  return (
    <div className='main-page-wrapper'>
      <div className='avatar-wallpaper-wrapper'>
        <div
          className='userpage-wallpaper'
          style={{
            backgroundImage: wallpaperUrl
              ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${wallpaperUrl})`
              : 'none',
          }}
        ></div>
        <Avatar avatar={userAvatar} classname={'avatar'}/>
      </div>
      <p className='userpage-name'>{userName}</p>
      <p className='userpage-username'>@{userUsername}</p>
      <p className='userpage-about'>{userAbout}</p>
      {!isSelf &&
        <div className='userpage-btn-options-container'>
          <button
            className={isFollowing ? 'unfollow-btn' : 'follow-btn'}
            onClick={() => handleFollow(username)}
          > {isFollowing ? 'Unfollow' : 'Follow'} </button>
        </div>
      }
      <UserPageNavbar username={username} />
      {isHomePage && (<LinkPage />)}
      {isBlogPage && (<Blog/>)}
      {isGalleryPage && (<Gallery/>)}
    </div>
  )
}

export { UserPage }
