import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT || 3001
const baseUrl = `http://localhost:${VITE_PORT}/api/links`

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const createLink = async (newObject) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const deleteLink = async (id) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.delete(`${baseUrl}/${id}`)
  return res.data
}

export default { createLink, deleteLink, setToken}