import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT || 3001
const baseUrl = `http://localhost:${VITE_PORT}/api/messages`

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getMessagesWith = async (username) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.get(`${baseUrl}/${username}`, config)
  return res.data
}

export default { setToken, getMessagesWith }
