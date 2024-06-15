import {
  useGetFetch,
  getFetch,
  postFetch,
  putFetch,
  deleteFetch
} from '../helpers/useFetch'

const URL_CATEGORIES = 'https://music-house.up.railway.app/api/category'

export const getCategories = () => {
  return getFetch(`${URL_CATEGORIES}/all`)
}

export const getCategoryById = (idCategory) => {
  return getFetch(`${URL_CATEGORIES}/search/${idCategory}`)
}

export const createCategory = ({ categoryName, description }) => {
  return postFetch(`${URL_CATEGORIES}/create`, { categoryName, description })
}

export const updateCategory = ({ idCategory, categoryName, description }) => {
  return putFetch(`${URL_CATEGORIES}/update`, {
    idCategory,
    categoryName,
    description
  })
}

export const deleteCategory = (idCategory) => {
  return deleteFetch(`${URL_CATEGORIES}/delete/${idCategory}`)
}
