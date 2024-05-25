import { useGetFetch, postFetch, putFetch } from '../helpers/useFetch'
/**
 * Acceso a DB en localhost
 */
export const getInstruments = () => {
  return useGetFetch('https://music-house.up.railway.app/api/instrument/all', [])
}

export const getInstrumentById = (id) => {
  return useGetFetch(`https://music-house.up.railway.app/api/instrument/search/${id}`)
}

export const getCategories = () => {
    return useGetFetch('https://music-house.up.railway.app/api/category/all')
}

export const getThemes = () => {
    return useGetFetch('https://music-house.up.railway.app/api/theme/all')
}

export const createInstrument = (payload) => {
    return postFetch('https://music-house.up.railway.app/api/instrument/create', payload)
}

export const updateInstrument = (payload) => {
    return putFetch('https://music-house.up.railway.app/api/instrument/update', payload)
}
