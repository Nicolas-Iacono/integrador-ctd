import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'

export const MainWrapper = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '.5rem',
  paddingTop: '20rem',
  paddingBottom: '3rem',
  alignItems: 'center',

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row'
  },

  [theme.breakpoints.up('md')]: {
    paddingTop: 320
  }
}))

export default MainWrapper
