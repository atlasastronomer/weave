import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT || 3001
const baseUrl = `http://localhost:${VITE_PORT}/api/authentication`

const signup = async (credentials) => {
  const res = await axios.post(`${baseUrl}/signup`, credentials)
  return res.data
}

const login = async (credentials) => {
  const res = await axios.post(`${baseUrl}/login`, credentials)
  return res.data
}


export default { signup, login }