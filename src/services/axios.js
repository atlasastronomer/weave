import axios from 'axios'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = (url) => {
  return axios.get(url)
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

const uploadToGallery = async (url, body, config) => {
  const res = await axios.post(url, body, config)
  return res
}

const login = async (url, credentials) => {
  const res = await axios.post(url, credentials)
  return res.data
}

const signup = async (url, credentials) => {
  const res = await axios.post(url, credentials)
  return res.data
}

export default {getAll, createBlog, login, signup, setToken, getMyBlogs, uploadToGallery}