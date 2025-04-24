import axios from 'axios'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const uploadToGallery = async (url, body) => {
  const config = {
    headers: {Authorization: token,
      'Content-type': 'application/json',
    }
  }
  const res = await axios.post(url, body, config)
  return res
}

const getMyGallery = async (url) => {
  const config = {
    headers: {Authorization: token},
  }

  const res = await axios.post(url, token, config)
  return res
}

export default { uploadToGallery, getMyGallery, setToken}