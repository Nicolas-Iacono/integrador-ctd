import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

export const TematicTitle = styled(Typography)(({ theme }) => ({
  height: 300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '2rem',
  fontWeight: 'bold',

  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
}))
