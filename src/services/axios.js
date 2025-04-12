import axios from 'axios'
import axiosService from '/src/services/axios'

const getAll = (url) => {
  return axios.get(url)
}

const create = (newObject, url) => {
  return axios.post(url, newObject)
}

const login = async (url, credentials) => {
  const res = await axios.post(url, credentials)
  return res.data
}

export default {getAll, create, login}