import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT || 3001
const baseUrl = `http://localhost:${VITE_PORT}/api/blogs`

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getBlogs = async () => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.get(baseUrl, config)
  return res.data
}

const createBlog = async (newObject) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.delete(`${baseUrl}/${id}`)
  return res.data
}

export default { getBlogs, createBlog, deleteBlog, setToken}