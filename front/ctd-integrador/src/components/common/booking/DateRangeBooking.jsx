import { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePickerBooking } from './DatePickerBooking'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { Code } from '../../../api/constants'
import { AvailabiltyPickersDay } from '../availability/AvailabiltyPickersDay'
import { isAvailableDate } from '../availability/availabilityHelper'
import { findInstrumentAvailability } from '../../../api/availability'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export const DateRangeBooking = ({ id }) => {
  const [startDate, setStartDate] = useState(dayjs().add(1, 'day'))
  const [endDate, setEndDate] = useState(dayjs().add(1, 'month').endOf('M'))
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

  const handleAvailableDate = (day) => {
    return isAvailableDate(day, availableDates)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerBooking
        format="DD-MM-YYYY"
        shouldDisableDate={handleAvailableDate}
        slots={{
          day: AvailabiltyPickersDay
        }}
      />
      <DatePickerBooking
        shouldDisableDate={handleAvailableDate}
        slots={{
          day: AvailabiltyPickersDay
        }}
      />
    </LocalizationProvider>
  )
}
