import {
  useGetFetch,
  getFetch,
  postFetch,
  putFetch,
  deleteFetch
} from '../helpers/useFetch'
import axios from 'axios'

const URL_GET_USERS = 'https://music-house.up.railway.app/api/user/all'
const URL_GET_USER = 'https://music-house.up.railway.app/api/user/search/'
const URL_CREATE_USER =
  'https://music-house.up.railway.app/api/auth/create/user'
const URL_UPDATE_USER = 'https://music-house.up.railway.app/api/user/update'
const URL_DELETE_USER = 'https://music-house.up.railway.app/api/user/delete'
const URL_BASE_LOGIN = 'https://music-house.up.railway.app/api/auth/login'
const URL_CREATE_ADMIN =
  'https://music-house.up.railway.app/api/auth/create/admin'
const URL_ADD_ROLE_USER =
  'https://music-house.up.railway.app/api/roles/user/rol/add'
const URL_DELETE_ROLE_USER =
  'https://music-house.up.railway.app/api/roles/user/rol/delete'

export const UsersApi = {
  getAllUsers: () => {
    return getFetch(URL_GET_USERS)
  },

  getUserById: (id) => {
    return getFetch(`${URL_GET_USER}${id}`)
  },

  registerUser: (user) => {
    return postFetch(URL_CREATE_USER, user)
  },

  updateUser: (user) => {
    return putFetch(URL_UPDATE_USER, user)
  },

  deleteUser: (idUser) => {
    return deleteFetch(`${URL_DELETE_USER}/${idUser}`)
  },

  addUserRole: (user, newRole) => {
    const data = {
      idUser: user.idUser,
      rol: newRole
    }

    return postFetch(URL_ADD_ROLE_USER, data)
  },

  deleteUserRole: (user, oldRole) => {
    const data = {
      idUser: user.idUser,
      rol: oldRole
    }

    return deleteFetch(URL_DELETE_ROLE_USER, data)
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
