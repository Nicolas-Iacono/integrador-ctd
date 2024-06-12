import { useGetFetch, postFetch, deleteFetch } from '../helpers/useFetch'

const URL_FAVORITES = 'https://music-house.up.railway.app/api/favorite'

export const getAllFavorites = (idUser) => {
  return useGetFetch(`${URL_FAVORITES}/search/${idUser}`)
}

export const addFavorite = (idUser, idInstrument) => {
  return postFetch(`${URL_FAVORITES}/add`, { idUser, idInstrument })
}

export const removeFavorite = (idFavorite, idUser, idInstrument) => {
  return deleteFetch(
    `${URL_FAVORITES}/delete/${idInstrument}/${idUser}/${idFavorite}`
  )
}
