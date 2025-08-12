import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT || 3001
const baseUrl = `http://localhost:${VITE_PORT}/api/comments`

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const fetchComments = async (postId) => {
  const res = await axios.get(`${baseUrl}/${postId}`)
  return res.data
}

const postComment = async (postId, newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(`${baseUrl}/${postId}`, newObject, config)
  return res.data
}

export default { fetchComments, postComment, setToken }