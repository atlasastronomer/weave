import axios from 'axios'

const getAll = (url) => {
  return axios.get(url)
}

const create = (newObject, url) => {
  return axios.post(url, newObject)
}

export default {getAll, create}