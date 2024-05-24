import { useGetFetch, postFetch, putFetch } from '../helpers/useFetch'
import axios from 'axios'

const URL_GET_USERS = "https://music-house.up.railway.app/api/user/all"
const URL_CREATE_USER = 'https://music-house.up.railway.app/api/auth/create/user'
const URL_BASE_LOGIN = 'https://music-house.up.railway.app/api/auth/login'
const URL_CREATE_ADMIN = 'https://music-house.up.railway.app/api/auth/create/admin'


export const UsersApi = {

  getAllUsers: async() => {
    try{
      const respuesta = await axios.get(URL_GET_USERS);
      return respuesta.data;

    }catch (error) {
      throw new Error('Error al listar usuarios ', error)
    }
  },

  registerUser: async(user) => {
    try{
      const respuesta = await axios.post(URL_CREATE_USER, user);
      return respuesta.data;

    }catch (error) {
      throw new Error('Error al crear usuario ', error)
    }
  },

  registerAdmin: async(adminUser) =>{
    try{
      const respuesta = await axios.post(URL_CREATE_ADMIN, adminUser);
      return respuesta.data;

    }catch (error) {
      throw new Error('Error al crear usuario administrador ', error)
    }
  },

  loginUser : async(user) => {
    try{
      const respuesta = await axios.post(URL_BASE_LOGIN, user);
      return respuesta.data;

    }catch (error) {
      throw new Error('Error de login ', error)
    }
  }

}

export default UsersApi