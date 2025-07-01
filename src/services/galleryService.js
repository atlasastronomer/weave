import axios from 'axios'
const VITE_PORT = import.meta.env.VITE_PORT || 3001
const baseUrl = `http://localhost:${VITE_PORT}/api/gallery`

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getGallery = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const uploadToGallery = async (body) => {
  const config = {
    headers: {Authorization: token,
      'Content-type': 'application/json',
    }
  }
  const res = await axios.post(baseUrl, body, config)
  return res.data
}

const deletePost = async (id) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.delete(`${baseUrl}/${id}`)
  return res.data
}

export default { uploadToGallery, getGallery, deletePost, setToken}