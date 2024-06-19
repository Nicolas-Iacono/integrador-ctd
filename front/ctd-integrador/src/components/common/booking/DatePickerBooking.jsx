import { styled } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export const DatePickerBooking = styled(DatePicker)(({ theme }) => ({
  backgroundColor: 'transparent',
  height: '2.5rem',
  width: '100%',

  input: {
    height: '2.5rem',
    border: 'none'
  },

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '60%'
  },

  [theme.breakpoints.up('md')]: {
    margin: 0,
    width: '28%',
    maxWidth: '10.5rem'
  }
}))
