import { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePickerBooking } from './DatePickerBooking'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import dayjs from 'dayjs'
import { Code } from '../../../api/constants'
import { AvailabiltyPickersDay } from '../availability/AvailabiltyPickersDay'
import { isAvailableDate } from '../availability/availabilityHelper'
import { findInstrumentAvailability } from '../../../api/availability'

dayjs.extend(isSameOrBefore)

export const DateRangeBooking = ({
  id,
  setBookingDateFrom,
  setBookingDateTo,
  setIsValidBookingRange
}) => {
  const [startDate, setStartDate] = useState(dayjs().add(1, 'day'))
  const [endDate, setEndDate] = useState(dayjs().add(1, 'month').endOf('M'))
  const [dateFrom, setDateFrom] = useState()
  const [dateTo, setDateTo] = useState()
  const [availableDates, setAvailableDates] = useState()
  const [data, code] = findInstrumentAvailability(
    id,
    dayjs(startDate).format('YYYY-MM-DD'),
    dayjs(endDate).format('YYYY-MM-DD')
  )

  useEffect(() => {
    if (code === Code.SUCCESS) {
      const availableDates = data.data.map((date) => date.dateAvailable)
      setAvailableDates(availableDates)
    } else if (code === Code.NOT_FOUND) {
      setAvailableDates([])
    }
  }, [data, code])

  useEffect(() => {
    if (typeof setIsValidBookingRange === 'function')
      setIsValidBookingRange(isValidaDateRange())
  }, [dateFrom, dateTo])

  const handleAvailableDate = (day) => {
    return isAvailableDate(day, availableDates)
  }

  const handleDateFromChange = (day, context) => {
    if (context.validationError) return

    setDateFrom(day)

    if (day && typeof setBookingDateFrom === 'function') setBookingDateFrom(day)
    if (day && day.isAfter(dateTo)) {
      setDateTo(day)
      if (typeof setBookingDateTo === 'function') setBookingDateTo(day)
    }
  }

  const handleDateToChange = (day, context) => {
    if (context.validationError) return

    setDateTo(day)

    if (day && typeof setBookingDateTo === 'function') setBookingDateTo(day)
    if (day && day.isBefore(dateFrom)) {
      setDateFrom(day)
      if (typeof setBookingDateFrom === 'function') setBookingDateFrom(day)
    }
  }

  const isValidaDateRange = () => {
    if (!dateFrom || !dateTo) return true

    const range = []
    let go = true
    let day = dayjs(dateFrom)

    while (go) {
      if (day.isSameOrBefore(dateTo)) {
        range.push(dayjs(day).format('YYYY-MM-DD'))
        day = dayjs(day).add(1, 'day')
      } else {
        go = false
      }
    }

    const notValids = range.filter((day) => availableDates.indexOf(day) === -1)

    return notValids.length === 0
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerBooking
        format="DD-MM-YYYY"
        shouldDisableDate={handleAvailableDate}
        slots={{
          day: AvailabiltyPickersDay
        }}
        value={dateFrom}
        onChange={handleDateFromChange}
        sx={{
          borderRadius: '10px 0 0 10px',
          borderColor: 'transparent',
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '10px 0 0 10px',
            borderColor: 'black'
          }
        }}
      />
      <DatePickerBooking
        format="DD-MM-YYYY"
        shouldDisableDate={handleAvailableDate}
        slots={{
          day: AvailabiltyPickersDay
        }}
        value={dateTo}
        onChange={handleDateToChange}
        sx={{
          borderRadius: '0 10px 10px 0px',
          borderColor: 'transparent',
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '0 10px 10px 0px',
            borderColor: 'black'
          }
        }}
      />
    </LocalizationProvider>
  )
}
