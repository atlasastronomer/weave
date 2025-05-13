import { useState, useEffect } from 'react'
import wallpaperService from '/src/services/wallpaperService'

const Wallpaper = () => {
  const [wallpaperUrl, setWallpaperUrl] = useState('')
  const [token, setToken] = useState('')
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
    wallpaperService.setToken(storedToken)

    if (storedToken) {
      loadWallpaper()
    }
  }, [])

  useEffect(() => {
    if (wallpaperUrl) {
      document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${wallpaperUrl}')`
    }
    return () => {
      document.body.style.backgroundImage = wallpaperUrl ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${wallpaperUrl}')` : ''
    }
  }, [wallpaperUrl])

  const loadWallpaper = async () => {
    try {
      const cloudName = 'dxmjrqdzj'
      const res = await wallpaperService.getWallpaper()
      const result = res.data
      setWallpaperUrl(`https://res.cloudinary.com/dxmjrqdzj/image/upload/${result.publicId}`)
    }
    catch (error) {
      console.log('Error in fetching wallpaper:', error.message)
    }
  }
}

export { Wallpaper }
