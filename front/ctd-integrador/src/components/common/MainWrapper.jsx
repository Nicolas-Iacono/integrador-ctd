import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'

export const MainWrapper = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '1rem',
  paddingTop: 150,
  paddingBottom: '3rem',

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row'
  },

  [theme.breakpoints.up('md')]: {
    paddingTop: 320
  }
}))
