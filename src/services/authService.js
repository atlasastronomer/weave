import axios from 'axios'

const login = async (url, credentials) => {
  const res = await axios.post(url, credentials)
  return res.data
}

const signup = async (url, credentials) => {
  const res = await axios.post(url, credentials)
  return res.data
}

export default { login, signup }