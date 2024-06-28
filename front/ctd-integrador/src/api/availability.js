import { useGetFetch } from '../helpers/useFetch'

const URL_FIND_INSTRUMENT_AVAILABILITY =
  'https://music-house.up.railway.app/api/available-dates/find/all'

export const findInstrumentAvailability = (
  idInstrument,
  startDate,
  endDate
) => {
  return useGetFetch(
    `${URL_FIND_INSTRUMENT_AVAILABILITY}/${startDate}/between/${endDate}/${idInstrument}`
  )
}

export const findInstrumentsAvailabilityByDates = (startDate, endDate) => {
  return endDate
    ? useGetFetch(
        `${URL_FIND_INSTRUMENT_AVAILABILITY}/${startDate}/between/${endDate}`
      )
    : useGetFetch(`${URL_FIND_INSTRUMENT_AVAILABILITY}/${startDate}`)
}
