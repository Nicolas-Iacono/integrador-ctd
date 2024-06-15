import {
  useGetFetch,
  postFetch,
  putFetch,
  deleteFetch
} from '../helpers/useFetch'

const URL_CATEGORIES = 'https://music-house.up.railway.app/api/category'

export const getCategories = () => {
  return useGetFetch(`${URL_CATEGORIES}/all`)
}

export const deleteCategory = (idCategory) => {
  return deleteFetch(`${URL_CATEGORIES}/delete/${idCategory}`)
}
