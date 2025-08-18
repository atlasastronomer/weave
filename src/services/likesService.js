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
  return res.data
}

const postImageLike = async (imageId) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.post(`${baseUrl}/posts/${imageId}`, null, config)
  return res.data
}

const postCommentLike = async (commentId) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.post(`${baseUrl}/comments/${commentId}`, null, config)
  return res.data
}

export default { postBlogLike, postImageLike, postCommentLike, setToken }