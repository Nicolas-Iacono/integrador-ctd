import { postFetch } from '../helpers/useFetch'

const URL_RESERVATIONS = 'https://music-house.up.railway.app/api/reservations'

export const createReservation = (idUser, idInstrument, startDate, endDate) => {
  return postFetch(`${URL_RESERVATIONS}/create`, {
    idUser,
    idInstrument,
    startDate,
    endDate
  })
}
