import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Avatar } from '/src/components/Home/Avatar'
import { ModalNavbar } from './ModalNavbar'
import userService from '/src/services/userService'
import './UserModal.css'

const UserModal = ({ closeModal }) => {
  const { username } = useParams()
  const [user, setUser] = useState()
  const [name, setName] = useState()
  const [avatar, setAvatar] = useState()
  const [about, setAbout] = useState()
  const [blogs, setBlogs] = useState([])
  const [posts, setPosts] = useState([])
  const [wallpaper, setWallpaper] = useState()

  useEffect(() => {
    loadUser()
  }, [username])
  
  const loadUser = async () => {
    const res = await userService.getUser(username)
    const user = res.data
    setUser(user)
    setName(user.name)
    setAvatar(user.avatar)
    setAbout(user.about)
    setBlogs(user.blogs)
    setPosts(user.posts)
    setWallpaper(user.wallpaper)
    
  }

  return (
    <div>
      <div className='avatar-wallpaper-wrapper'>
        <div
          className='modal-wallpaper'
          style={{
            backgroundImage: wallpaper?.publicId
              ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://res.cloudinary.com/dxmjrqdzj/image/upload/${wallpaper.publicId}')`
              : 'none',
          }}
        ></div>
        <Avatar avatar={avatar} />
      </div>
      <p className='modal-username'>@{username}</p>
      <p className='modal-name'>{name}</p>
      <p className='modal-about'>{about}</p>
      <div className='modal-nav-bar'>
        <ModalNavbar />
      </div>
      <hr></hr>
      <button className='close-modal' onClick={closeModal}>
        <i className="fa-solid fa-xmark fa-lg fa-icon"></i>
      </button>
    </div>
  )
}

export { UserModal }
