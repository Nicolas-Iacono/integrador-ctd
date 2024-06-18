import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import dayjs from 'dayjs'
import { AvailabiltyPickersDay } from './AvailabiltyPickersDay'
import { isAvailableDate } from './availabilityHelper'
import { Code } from '../../../api/constants'
import { findInstrumentAvailability } from '../../../api/availability'
import { Box } from '@mui/material'

const CustomLocalizationProvider = styled(LocalizationProvider)(
  ({ theme }) => ({
    display: 'flex',
    paddingBottom: '1rem',
    width: '100%',
    justifyContent: 'center'
  })
)

const CustomDateCalendar = styled(DateCalendar)(({ theme }) => ({
  '& .MuiPickersArrowSwitcher-root': {
    display: 'none'
  },
  '& .MuiPickersCalendarHeader-switchViewButton': {
    display: 'none'
  }
}))

export const InstrumentAvailability = ({ id }) => {
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
    <>
      {availableDates && (
        <CustomLocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
          >
            <CustomDateCalendar
              value={startDate}
              shouldDisableDate={handleAvailableDate}
              slots={{
                day: AvailabiltyPickersDay
              }}
              readOnly
            />
            <CustomDateCalendar
              value={endDate}
              shouldDisableDate={handleAvailableDate}
              slots={{
                day: AvailabiltyPickersDay
              }}
              readOnly
            />
          </Box>
        </CustomLocalizationProvider>
      )}
    </>
  )
}
