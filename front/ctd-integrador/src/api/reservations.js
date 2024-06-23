import {
  useGetFetch,
  getFetch,
  postFetch,
  putFetch,
  deleteFetch
} from '../helpers/useFetch'
const URL_RESERVATIONS = 'https://music-house.up.railway.app/api/reservations'

export const ReservationApi = {

  getReservations: () => {
    return getFetch(`${URL_RESERVATIONS}/all`)
  },

  getReservationById: (id) => {
    return getFetch(`${URL_RESERVATIONS}/search/user/${id}`)
  },


  createReservation: (payload) => {
    return postFetch(`${URL_RESERVATIONS}/create`, payload)
  },

  deleteReservation: (idInstrument, idUser, idReservation) => {
    return deleteFetch(`${URL_RESERVATIONS}/delete/${idInstrument}/${idUser}/${idReservation}`)
  }

  }