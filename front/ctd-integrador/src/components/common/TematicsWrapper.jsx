import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'

const TematicsWrapper = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '1rem',
  paddingTop: 190,

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },

  [theme.breakpoints.up('md')]: {
    paddingTop: 390,
  },
}))
export default TematicsWrapper