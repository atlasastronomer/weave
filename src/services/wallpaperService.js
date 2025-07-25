import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT || 3001
const baseUrl = `http://localhost:${VITE_PORT}/api/wallpaper`

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getWallpaper = async () => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.get(baseUrl, config)
  return res.data
}

const uploadWallpaper = async (body) => {
  const config = {
    headers: {Authorization: token,
      'Content-type': 'application/json',
    }
  }
  const res = await axios.post(baseUrl, body, config)
  return res.data
}

export default { getWallpaper, uploadWallpaper, setToken, getWallpaper }