import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT || 3001
const baseUrl = `http://localhost:${VITE_PORT}/api/follow-info`

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getUserFollow = async (username) => {
  const res = await axios.get`${baseUrl}/${username}`
  return res.data
}

const handleFollow = async (username) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.post(`${baseUrl}/${username}`)
  return res.data
}

export default { getUserFollow, handleFollow, setToken }