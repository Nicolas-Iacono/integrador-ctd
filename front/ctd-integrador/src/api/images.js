import { postFetch, deleteFetch } from '../helpers/useFetch'

const URL_IMAGES = 'https://music-house.up.railway.app/api/imageurls'

export const addImage = (idInstrument, imageUrl) => {
  return postFetch(`${URL_IMAGES}/add_image`, { idInstrument, imageUrl })
}

export const removeImage = (idImage, idInstrument) => {
  return deleteFetch(`${URL_IMAGES}/delete/${idInstrument}/${idImage}`)
}
