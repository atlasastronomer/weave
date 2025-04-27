import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getBlogs = async (url) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.get(url, config)
  return res
}

const createBlog = async (url, newObject) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.post(url, newObject, config)
  return res
}

export default { getBlogs, createBlog, setToken}