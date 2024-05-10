import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const MenuWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  flexGrow: 1,

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}))
