import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT || 3001
const baseUrl = `http://localhost:${VITE_PORT}/api/about`

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAbout = async () => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.get(baseUrl, config)
  return res.data
}

const changeAbout = async (newObject) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

export default { getAbout, changeAbout, setToken }