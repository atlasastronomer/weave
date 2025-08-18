import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT || 3001
const baseUrl = `http://localhost:${VITE_PORT}/api/favorites`

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const toggleFavorite = async (model, id) => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(`${baseUrl}/${model}/${id}`, null, config)
  return res.data
}

const getFavorites = async () => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.get(baseUrl, config)
  return res.data
}

export default { setToken, toggleFavorite, getFavorites }
