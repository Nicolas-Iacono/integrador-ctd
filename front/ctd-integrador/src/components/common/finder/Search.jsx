import { styled, alpha } from '@mui/material/styles'

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.7)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  height: '2.5rem',
  maxWidth: '18.375rem',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '33%'
  },

  '& .MuiInputBase-root': {
    width: '100%',
    height: '100%'
  }
}))
