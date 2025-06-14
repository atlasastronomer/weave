import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT || 3001
const baseUrl = `http://localhost:${VITE_PORT}/api/users`

const getAllUsers = async () => {
  const res = await axios.get(baseUrl)
  return res
}

const getUser = async (username) => {
  const res = await axios.get(`${baseUrl}/${username}`)
  return res
}

export default { getAllUsers, getUser }