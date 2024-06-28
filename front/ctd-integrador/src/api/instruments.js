import {
  useGetFetch,
  getFetch,
  postFetch,
  putFetch,
  deleteFetch
} from '../helpers/useFetch'

const URL_INSTRUMENTS = 'https://music-house.up.railway.app/api/instrument'
const URL_THEMES = 'https://music-house.up.railway.app/api/theme'

export const getInstruments = () => {
  return getFetch(`${URL_INSTRUMENTS}/all`)
}

export const getInstrumentById = (id) => {
  return getFetch(`${URL_INSTRUMENTS}/search/${id}`)
}

export const getThemes = () => {
  return useGetFetch(`${URL_THEMES}/all`)
}

export const createInstrument = (payload) => {
  return postFetch(`${URL_INSTRUMENTS}/create`, payload)
}

export const updateInstrument = (payload) => {
  return putFetch(`${URL_INSTRUMENTS}/update`, payload)
}

export const deleteInstrument = (idInstrument) => {
  return deleteFetch(`${URL_INSTRUMENTS}/delete/${idInstrument}`)
}

export const searchInstrumentsByName = (name) => {
  return useGetFetch(
    `${URL_INSTRUMENTS}/find/name/${name}`,
    (!name || name === '') && []
  )
}
