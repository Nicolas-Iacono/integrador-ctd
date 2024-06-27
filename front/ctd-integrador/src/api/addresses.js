import { putFetch } from '../helpers/useFetch'

const URL_ADDRESSES = 'https://music-house.up.railway.app/api/address'

export const updateAddress = ({
  idAddress,
  street,
  number,
  city,
  state,
  country
}) => {
  return putFetch(`${URL_ADDRESSES}/update`, {
    idAddress,
    street,
    number,
    city,
    state,
    country
  })
}
