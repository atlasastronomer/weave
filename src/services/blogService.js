import axios from 'axios'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getMyBlogs = async (url) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.post(url, token, config)
  return res
}

const createBlog = async (url, newObject) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.post(url, newObject, config)
  return res
}

export default { getMyBlogs, createBlog, setToken}