import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar } from '../Home/Avatar'
import { UserPageNavbar } from './UserPageNavbar'
import { LinkPage } from '../Links/LinkPage'
import { Blog } from '../Blog/Blog'
import { Gallery } from '../Gallery/Gallery'
import userService from '/src/services/userService'
import wallpaperService from '/src/services/wallpaperService'
import './UserPage.css'

const UserPage = () => {
  // const { username } = useParams()

  // const [user, setUser] = useState(null)
  // const [wallpaperUrl, setWallpaperUrl] = useState('')
  // const [activeTab, setActiveTab] = useState('links')

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await userService.getUser(username)
  //       setUser(res.data)
  //     } catch (error) {
  //       console.error('Error fetching user:', error)
  //     }
  //   }

  //   const fetchWallpaper = async () => {
  //     try {
  //       const res = await wallpaperService.getWallpaperByUsername(username)
  //       setWallpaperUrl(`https://res.cloudinary.com/dxmjrqdzj/image/upload/${res.data.publicId}`)
  //     } catch (error) {
  //       console.error('Error fetching wallpaper:', error)
  //     }
  //   }

  //   fetchUser()
  //   fetchWallpaper()
  // }, [username])

  // useEffect(() => {
  //   if (wallpaperUrl) {
  //     document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${wallpaperUrl})`
  //   }
  //   return () => {
  //     document.body.style.backgroundImage = ''
  //   }
  // }, [wallpaperUrl])

  return (
    <>
    </>
  )
}

export { UserPage }
