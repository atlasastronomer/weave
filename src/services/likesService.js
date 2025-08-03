import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT || 3001
const baseUrl = `http://localhost:${VITE_PORT}/api/likes`

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const postBlogLike = async (blogId) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.post(`${baseUrl}/blogs/${blogId}`, null, config)
}

const postImageLike = async (imageId) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.post(`${baseUrl}/posts/${imageId}`, null, config)
}

export default { postBlogLike, postImageLike, setToken }