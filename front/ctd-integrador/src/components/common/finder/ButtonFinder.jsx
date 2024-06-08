import { styled, alpha } from '@mui/material/styles'
import { Button } from '@mui/material'

export const ButtonFinder = styled(Button)(({ theme }) => ({
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.7)
  },
  height: '2.5rem',
  marginLeft: '0.5rem !important',

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3)
  }
}))
