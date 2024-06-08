import { useGetFetch, postFetch, putFetch } from '../helpers/useFetch'

const URL_FIND_INSTRUMENT_BY_DATE =
  'https://music-house.up.railway.app/api/available-dates/find/all'

const URL_FIND_INSTRUMENT_BY_DATES =
  'https://music-house.up.railway.app/api/available-dates/find/all'

export const findInstrumentAvailabilityByDate = (idInstrument, date) => {
  return useGetFetch(`${URL_FIND_INSTRUMENT_BY_DATE}/${date}/${idInstrument}`)
}

export const findInstrumentsAvailabilityByDates = (startDate, endDate) => {
  return endDate
    ? useGetFetch(
        `${URL_FIND_INSTRUMENT_BY_DATES}/${startDate}/between/${endDate}`
      )
    : useGetFetch(`${URL_FIND_INSTRUMENT_BY_DATE}/${startDate}`)
}
