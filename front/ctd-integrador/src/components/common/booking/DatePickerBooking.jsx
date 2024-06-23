import { styled } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export const DatePickerBooking = styled(DatePicker)(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '100%',
  height: '3.5rem',

  input: {
    height: '2.5rem',
    border: 'none'
  },

  [theme.breakpoints.up('md')]: {
    maxWidth: '9rem'
  },

  [theme.breakpoints.up('md')]: {
    width: 'auto',
    maxWidth: '11rem',
    margin: 0
  }
}))
