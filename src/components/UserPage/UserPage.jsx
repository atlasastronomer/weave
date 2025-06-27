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
  const [userWallpaperId, setUserWallpaperId] = useState()
  const [wallpaperUrl, setWallpaperUrl] = useState('')

  const location = useLocation()
  const isHomePage = location.pathname === `/${username}`
  const isBlogPage = location.pathname === `/${username}/blogs`
  const isGalleryPage = location.pathname === `/${username}/gallery`

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedName = localStorage.getItem('name')
    const storedUsername = localStorage.getItem('username')
    setToken(storedToken)

    if (storedToken) {
      avatarService.setToken(storedToken)
      aboutService.setToken(storedToken)
      userService.setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userService.getUser(username)
        setUserAvatar(user.avatar)
        setUserName(user.name)
        setUserUsername(user.username)
        setUserAbout(user.about)
        setUserLinks(user.links.reverse())
        setUserPosts(user.posts.reverse())
        setUserBlogs(user.blogs.reverse())
        setWallpaperUrl(`https://res.cloudinary.com/dxmjrqdzj/image/upload/${user.wallpaper.publicId}`)
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
        console.log("UserPage.jsx: Viewing my Profile:",result.isSelf)
      }
      catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    verifyIsSelf()
  }, [username])

  const Blog = () => {
    return(
      <div>
        {userBlogs.map((blog) => 
          <Blogpost
            username={username}
            key={blog.id}
            blog={blog}
          />
        )}
      </div>
    )
  }

  const Gallery = () => {
    return(
      <div>
        <div className='gallery-board'>
          {userPosts.map((post, i) =>
            <GalleryPost
              username={username}
              key={i}
              user={username}
              post={post}
            />
          )}
        </div>
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
      <UserPageNavbar username={username} />
      <hr className='line-break' style={{ width: '100%', border: 'none', height: '1px', backgroundColor: '#ccc' }} />
      {isHomePage && (<LinkPage />)}
      {isBlogPage && (<Blog/>)}
      {isGalleryPage && (<Gallery/>)}
    </div>
  )
}

export { UserPage }
