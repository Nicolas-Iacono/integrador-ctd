import { styled, alpha } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export const DatePickerFinder = styled(DatePicker)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  height: '2.5rem',
  width: '20%',
  marginRight: '0.375rem',
  maxWidth: '10.5rem',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.7)
  },

  input: {
    height: '2.5rem',
    border: 'none'
  }
}))
