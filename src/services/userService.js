import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT || 3001
const baseUrl = `http://localhost:${VITE_PORT}/api/users`

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAllUsers = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getUser = async (username) => {
  const res = await axios.get(`${baseUrl}/${username}`)
  return res.data
}

const verifyIsSelf = async (username) => {
  const config = {
    headers: {Authorization: token},
  }

  const url = `http://localhost:${VITE_PORT}/api/is-self`
  const res = await axios.post(url, {username: username}, config)
  return res.data
}

export default { getAllUsers, getUser, verifyIsSelf, setToken }