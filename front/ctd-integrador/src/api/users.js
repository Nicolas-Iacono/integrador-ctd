import { useGetFetch, postFetch, putFetch } from '../helpers/useFetch'
import axios from 'axios'

const URL_GET_USERS = 'https://music-house.up.railway.app/api/user/all'
const URL_GET_USER = 'https://music-house.up.railway.app/api/user/search/'
const URL_CREATE_USER =
  'https://music-house.up.railway.app/api/auth/create/user'
const URL_UPDATE_USER = 'https://music-house.up.railway.app/api/user/update'
const URL_BASE_LOGIN = 'https://music-house.up.railway.app/api/auth/login'
const URL_CREATE_ADMIN =
  'https://music-house.up.railway.app/api/auth/create/admin'

export const UsersApi = {
  getAllUsers: () => {
    return useGetFetch(URL_GET_USERS)
  },

  getUserById: (id) => {
    return useGetFetch(`${URL_GET_USER}${id}`)
  },

  registerUser: (user) => {
    return postFetch(URL_CREATE_USER, user)
  },

  updateUser: (user) => {
    return putFetch(URL_UPDATE_USER, user)
  },

  registerAdmin: async (adminUser) => {
    try {
      const respuesta = await axios.post(URL_CREATE_ADMIN, adminUser)
      return respuesta.data
    } catch (error) {
      throw new Error('Error al crear usuario administrador ', error)
    }
  },

  loginUser: async (user) => {
    try {
      const respuesta = await axios.post(URL_BASE_LOGIN, user)
      return respuesta.data
    } catch (error) {
      throw new Error('Error de login ', error)
    }
  }
}
