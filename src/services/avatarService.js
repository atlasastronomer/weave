import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT || 3001
const baseUrl = `http://localhost:${VITE_PORT}/api/avatar`

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAvatar = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getAvatarByUsername = async (username) => {
  const res = await axios.get(`${baseUrl}/${username}`)
  return res.data
}

const uploadAvatar = async (body) => {
  const config = {
    headers: {Authorization: token,
      'Content-type': 'application/json',
    }
  }
  const res = await axios.post(baseUrl, body, config)
  return res.data
}

export default { getAvatar, uploadAvatar, getAvatarByUsername, setToken }