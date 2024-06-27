import { putFetch } from '../helpers/useFetch'

const URL_PHONES = 'https://music-house.up.railway.app/api/phone'

export const updatePhone = ({ idPhone, phoneNumber }) => {
  return putFetch(`${URL_PHONES}/update`, {
    idPhone,
    phoneNumber
  })
}
